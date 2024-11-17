import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {StudentDtoToSend} from "../../../services/models/student-dto-to-send";

import {GetAllSchoolYearsByType$Params} from "../../../services/fn/school-year-controller/get-all-school-years-by-type";
import {SchoolYearControllerService} from "../../../services/services/school-year-controller.service";
import {ProfessorToSend} from "../../../services/models/professor-to-send";

import {AuthenticationControllerService} from "../../../services/services/authentication-controller.service";
import {Router} from "@angular/router";
import {AddStudents$Params} from "../../../services/fn/authentication-controller/add-students";
import {FormBuilder, FormGroup} from "@angular/forms";



@Component({
  selector: 'app-step2',
  templateUrl: './step2.component.html',
  styleUrls: ['./step2.component.css']
})
export class Step2Component implements OnInit {

  constructor(
    private schoolYearService : SchoolYearControllerService,
    private authentification : AuthenticationControllerService,
    private router:Router,
    private fb: FormBuilder
  ) {
  }
  myForm: FormGroup | undefined;
  ngOnInit(): void {
    this.myForm = this.fb.group({
      birthday: ['']  // Initialize the form control for date
    });
    if(this.selectedRole=='student'){
      this.getAllTypes();
    }else if (this.selectedRole=='teacher'){
     this.getAllDepartments();
    }
  }
  @Input()
  selectedRole: 'student' | 'teacher' | null = null;

  @ViewChild('fileInput', { static: false }) fileInput!: ElementRef;

  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0];
    this.data.image=file;
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        // Set the imagePreview to the data URL of the selected image
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file); // Convert image to data URL
    }
  }

  // Trigger the hidden file input when clicking the circle
  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }
  types: string[] | undefined;
  departments :string[] | undefined;

  getAllTypes(){
    this.schoolYearService.getAllTypes().subscribe({
      next:(res)=>{
        this.types=res;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  getAllDepartments(){
    this.schoolYearService.getAllDepartments().subscribe({
      next:(res)=>{
        this.departments=res;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }
  imagePreview: string | ArrayBuffer | null = null;
  data : any={
    email:"",
    password:"",
    rePassword:"",
    phone:"",
    birthday:"",
    sexe:undefined,
    firstName:"",
    lastName:"",
    image:undefined
  }

  type :GetAllSchoolYearsByType$Params= {type:undefined};

  schoolYears:any={};

  getAllSchoolYearsByType(){
  this.schoolYearService.getAllSchoolYearsByType(this.type).subscribe({
    next:(res: any)=>{
    this.schoolYears=res;
  },
    error:(err)=>{
     console.log(err);
    }
  });
  }


  schoolYear:string="";
  departement:undefined;

  student: StudentDtoToSend={};

  professor:ProfessorToSend={};

  checkIfAllFieldsFilled(data: any): boolean {
    // Check each field to ensure it's not an empty string or undefined
    return Object.values(data).every(value => {
      return value !== "" && value !== undefined && value !== null;
    });
  }


  state:boolean=false;
  addUser(successCallback: Function, errorCallback: Function) {
    if (this.checkIfAllFieldsFilled(this.data)) {
      if (this.data.password !== this.data.rePassword) {
        errorCallback("Passwords do not match");
      } else {
        if (this.selectedRole === 'student') {
          this.student = {
            sexe:this.data.sexe,
            lastName:this.data.lastName,
            firstName:this.data.firstName,
            birthday:this.data.birthday,
            phone:this.data.phone,
            password:this.data.password,
            email:this.data.email,
            schoolYear: this.schoolYear,
            image:this.data.image

          };

          this.authentification.addStudents( { body: this.student } ).subscribe({

            next: (res) => {
              successCallback(res); // Success callback
            },
            error: (err) => {
              console.log(this.student)
              errorCallback(err.error); // Error callback
            }
          });
        } else if (this.selectedRole === 'teacher') {
          this.professor = {
            sexe:this.data.sexe,
            lastName:this.data.lastName,
            firstName:this.data.firstName,
            birthday:this.data.birthday,
            phone:this.data.phone,
            password:this.data.password,
            email:this.data.email,
            departement: this.departement,
            image:this.data.image
          };
          this.authentification.addProfessor({ body: this.professor }).subscribe({
            next: (res) => {
              successCallback(res); // Success callback
            },
            error: (err) => {
              console.log(this.departement);
              errorCallback(err.error); // Error callback
            }
          });
        }
      }

    } else {
      console.log("Some fields are empty.");
      errorCallback("Some fields are empty")
    }

  }

  getData() {
    return this.data;
  }

}
