import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {faChalkboardTeacher, faCheck, faSpellCheck, faUserGraduate} from "@fortawesome/free-solid-svg-icons";
import {Step2Component} from "../../components/register/step2/step2.component";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  currentStep: number = 0;
  selectedRole: 'student' | 'teacher' | null = null;

  @ViewChild(Step2Component) step2Component!: Step2Component;

  constructor(private router: Router) {}

  errorMsg:Array<string> = [];
  emailTo:string="";
  nextStep() {
    if (this.currentStep < 2) {
      this.step2Component.addUser(
        // Success callback
        (collectedData: any) => {
          console.log(collectedData);
          console.log("Succcess");
          console.log(collectedData.email);
          this.emailTo=collectedData.email;
          this.isSuccess=true;
         // if (collectedData) {
          //  this.currentStep++;
          //}
        },
        // Error callback
        (error: any) => {
          console.log("Error:", error);
          this.errorMsg=[];
          this.isOpen=true;
          if(error.validationsErrors){
            this.errorMsg=error.validationsErrors;
          }else if(error.error){
            this.errorMsg.push(error.error);
          }else{
            this.errorMsg.push(error);
          }
        }
      );
    } else if (this.currentStep === 2) {
      // Assuming the registration process is successful
      console.log("Proceeding to the final step...");
      // this.router.navigate(['/home']);
    }
  }


  previousStep() {
    if (this.currentStep > 0) {

      this.currentStep--;

    }
  }

  selectRole(role: 'student' | 'teacher') {
    this.selectedRole = role;
    this.currentStep++;
  }

  protected readonly faUserGraduate = faUserGraduate;
  protected readonly faChalkboardTeacher = faChalkboardTeacher;
  isOpen: boolean = false;
  isSuccess:boolean=false;
  closeModal() {
    this.isOpen = false;
  }
  closeModalSuccess() {
    this.isSuccess = false;
    this.currentStep++;
  }

  protected readonly faSpellCheck = faSpellCheck;
  protected readonly faCheck = faCheck;
}
