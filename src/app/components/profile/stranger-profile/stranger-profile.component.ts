import {Component, OnInit} from '@angular/core';
import {StudentControllerService} from "../../../services/services/student-controller.service";
import {ProfessorControllerService} from "../../../services/services/professor-controller.service";
import {ActivatedRoute} from "@angular/router";
import {StudentDtoToReturn} from "../../../services/models/student-dto-to-return";
import {ProfessorToReturn} from "../../../services/models/professor-to-return";
import {faBuilding, faChalkboardTeacher, faStar, faUserGraduate} from "@fortawesome/free-solid-svg-icons";
import {ProjectToReturn} from "../../../services/models/ProjectToReturn";
import {ProjectControllerService} from "../../../services/services/project-controller.service";
import {ProjectToReturnTotal} from "../../../services/models/ProjectToReturnTotal";

@Component({
  selector: 'app-stranger-profile',
  templateUrl: './stranger-profile.component.html',
  styleUrls: ['./stranger-profile.component.css']
})
export class StrangerProfileComponent implements OnInit{
  userType:string|null="";
  userId:number=0;
  sumReview:number=0;
  meanReview:number=0;
  constructor(
    private studentService:StudentControllerService,
    private professorService:ProfessorControllerService,
    private route:ActivatedRoute,
    private projectService:ProjectControllerService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userType = params.get('userType');
      this.userId = Number(params.get('userId'));
    });
    this.getAllInfos(this.userId);

  }
  apiUrlImage:string="http://localhost:8080/images/";

  student:StudentDtoToReturn={
    id:0,
    email:""
  };
  professor:ProfessorToReturn={};

  getAllInfos(userId:number){
    if(this.userType=="student"){
      this.studentService.getStudentById({id:userId}).subscribe({
        next:(res)=>{
          this.student=res;
          this.getUserProjectsOfStudent(res.id!);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }else if(this.userType=="professor"){
      this.professorService.getProfessorAllInfosByID({id:userId}).subscribe({
        next:(res)=>{
          this.professor=res;
          this.getUserProjectsOfProfessor(res.id!);
        },
        error:(err)=>{
          console.log(err);
        }
      });
    }

  }
  calculReviews(filteredProjects:ProjectToReturnTotal[]){
    this.sumReview= filteredProjects.reduce((sum,project)=>{
      return sum+project.evaluationToReturns.length
    },0);
    this.meanReview=filteredProjects.reduce((sum,project)=>{
      return sum+(this.isNaN(project.meanEvaluations)?0:project.meanEvaluations)
    },0);

   this.meanReview=this.meanReview/this.sumReview;
  }

  filteredProjects: ProjectToReturnTotal[] = [];

  getUserProjectsOfStudent(id:number){
    this.projectService.getAllProjectsByStudent({id}).subscribe({
      next:(res)=>{
        this.filteredProjects=res;
        this.calculReviews( this.filteredProjects);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  getUserProjectsOfProfessor(id:number){
    this.projectService.getAllProjectsByProfessor({id}).subscribe({
      next:(res)=>{
        this.filteredProjects=res;
        this.calculReviews( this.filteredProjects);
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }



  get currentUser() {
    return this.userType === 'student' ? this.student : this.professor;
  }
  isNaN(value: any): boolean {
    return isNaN(value);
  }
  protected readonly faStar = faStar;
  protected readonly faUserGraduate = faUserGraduate;
  protected readonly faChalkboardTeacher = faChalkboardTeacher;
  protected readonly faBuilding = faBuilding;
}
