import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ProjectControllerService} from "../../services/services/project-controller.service";
import {StudentControllerService} from "../../services/services/student-controller.service";
import {StudentDtoToReturn} from "../../services/models/student-dto-to-return";
import {ProfessorControllerService} from "../../services/services/professor-controller.service";
import {ProfessorToReturn} from "../../services/models/professor-to-return";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  emailTO: string | null="";
  userType:string | null="";
  constructor(
    private studentService:StudentControllerService,
    private route: ActivatedRoute,
    private professorService:ProfessorControllerService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.emailTO = params.get('email');
      this.userType= params.get('userType');
    });
    if(this.emailTO!=null) {
    this.getAllInfos(this.emailTO);

    }
  }
  student:StudentDtoToReturn={
    id:0,
    email:""
  };
  professor:ProfessorToReturn={

  }
  apiUrlImage:string="http://localhost:8080/images/";
  getAllInfos(email:string){
    if(this.userType?.toUpperCase()=="STUDENT"){
      this.studentService.getStudentByEmail({email}).subscribe({
        next:(res)=>{

          this.student={
            email:res.email,
            firstName:res.firstName,
            lastName:res.lastName,
            phone:res.phone,
            sexe:res.sexe,
            schoolYear:res.schoolYear,
            id:res.id,
            birthday:res.birthday,
            createdDate:res.createdDate,
            imageName:res.imageName
          }
        },
        error:(err)=>{
          console.log(err);
        }

      });
    }else if(this.userType?.toUpperCase()=="PROFESSOR"){

      this.professorService.getProfessorByEmail({email}).subscribe({
        next:(res)=>{

          this.professor={
            email:res.email,
            firstName:res.firstName,
            lastName:res.lastName,
            phone:res.phone,
            sexe:res.sexe,
            departement:res.departement,
            id:res.id,
            birthday:res.birthday,
            createdDate:res.createdDate,
            imageName:res.imageName
          }
        },
        error:(err)=>{
          console.log(err);
        }

      });
    }



  }

  get currentUser() {
    return this.userType?.toUpperCase() === 'STUDENT' ? this.student : this.professor;
  }
}
