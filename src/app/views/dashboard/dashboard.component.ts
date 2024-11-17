import {Component, OnInit} from '@angular/core';
import {faCheck, faRightFromBracket} from "@fortawesome/free-solid-svg-icons";
import {StudentControllerService} from "../../services/services/student-controller.service";
import {TokenService} from "../../services/security/token/token.service";
import {JwtDecoderService} from "../../services/security/token/jwt-decoder.service";
import {GetStudentByEmail$Params} from "../../services/fn/student-controller/get-student-by-email";
import {StudentDtoToReturn} from "../../services/models/student-dto-to-return";
import {Router} from "@angular/router";
import {ProjectToReturn} from "../../services/models/ProjectToReturn";
import {ProjectControllerService} from "../../services/services/project-controller.service";
import {StudentDtoToReturnSmall} from "../../services/models/student-dto-to-small-return";
import {ProfessorControllerService} from "../../services/services/professor-controller.service";
import {GetProfessorByEmail$Params} from "../../services/fn/professor-controller/get-professor-by-email-small";
import {ProfessorToReturnSmall} from "../../services/models/professor-to-return-small";



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit{
  ngOnInit(): void {
    this.userType=this.decode.getRole(this.token.token)+"";

    if(this.userType==="STUDENT"){
      this.getStudentInfos();
    }else if(this.userType==="PROFESSOR"){
      this.getProfessorInfos();
    }

    this. getAllProjects();
  }
  constructor(
    private studentService:StudentControllerService,
    private token:TokenService,
    private decode:JwtDecoderService,
    private router:Router,
    private projectService:ProjectControllerService,
    private professorService:ProfessorControllerService
  ) {
  }

  student:StudentDtoToReturnSmall={
    email:"",
    id:0
  };
  professor:ProfessorToReturnSmall={
    email:"",
    id:0
  }

  param:GetStudentByEmail$Params={
   email:this.decode.getEmail(this.token.token)
  }
  paramProf:GetProfessorByEmail$Params={
    email:this.decode.getEmail(this.token.token)
  }
  projects:ProjectToReturn[]=[];

  getAllProjects(){
    this.projectService.getAllProjects().subscribe({
      next:(res)=>{
        this.projects=res;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  apiUrlImage:string="http://localhost:8080/images/";

  getStudentInfos(){
    this.studentService.getStudentByEmailSmall(this.param).subscribe(
      {
        next:(res)=>{
              this.student={
                email:res.email,
                fullName:res.fullName,
                imageName:res.imageName,
                id:res.id
              };

              localStorage.setItem("key", res.id.toString());
        },
        error:(err)=>{
            console.log(err.error.error);
        },
      }
    );

  }



  getProfessorInfos(){
    this.professorService.getProfessorByEmailSmall(this.paramProf).subscribe(
      {
        next:(res)=>{
          this.professor={
            email:res.email,
            fullName:res.fullName,
            imageName:res.imageName,
            id:res.id
          };

          localStorage.setItem("key", res.id.toString());
        },
        error:(err)=>{
          console.log(err.error.error);
        },
      }
    );

  }



  isSidebarOpen = true;  // Sidebar is open by default

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;  // Toggle sidebar state
  }

  selectedComponent: string | null = null;

  showComponent(componentName: string) {
    this.selectedComponent = componentName;
  }
  isDropdownOpen = false;

  protected readonly faRightFromBracket = faRightFromBracket;
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToProfile() {
    // Navigate to profile
    console.log('Navigating to Profile...');
    // Add your routing or logic here
  }

  goToSettings() {
    // Navigate to settings
    console.log('Navigating to Settings...');
    // Add your routing or logic here
  }

  logOut() {

    this.token.clearToken();
    localStorage.clear();
    this.isDisplay=false;
    this.router.navigate(['login']);
  }

  protected readonly faCheck = faCheck;
  isDisplay: boolean=false;
  userType: string = "";

  get currentUser() {
    return this.userType === 'STUDENT' ? this.student : this.professor;
  }

  cancel() {
    this.isDisplay=false;
  }
}
