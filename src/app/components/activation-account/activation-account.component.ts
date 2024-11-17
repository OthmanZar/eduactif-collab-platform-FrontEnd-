import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";
import {ValidateUser$Params} from "../../services/fn/authentication-controller/validate-user";

@Component({
  selector: 'app-activation-account',
  templateUrl: './activation-account.component.html',
  styleUrls: ['./activation-account.component.css']
})
export class ActivationAccountComponent {


  message='';
  isOkey=true;
  submitted=false;
  @Input() email:string="";
  @Input() type: 'student' | 'teacher' | null = null
  constructor(
    private router:Router,
    private authService:AuthenticationControllerService
  ) {
  }

  onCodeCompleter(token: string) {
    this.confirmaAccount(token);
  }

  private confirmaAccount(token: string) {
  const  parm : ValidateUser$Params={
      email:this.email,
      code:token,
      type:this.type
    }
    this.authService.validateUser(parm).subscribe({
      next:(res)=>{
        this.submitted=true;
        this.isOkey=true;
        console.log(res);
      },
      error:(err)=>{
        this.message=err.error.error;
        this.submitted=true;
        this.isOkey=false;
        console.log(err);
      }
    })

  }
}
