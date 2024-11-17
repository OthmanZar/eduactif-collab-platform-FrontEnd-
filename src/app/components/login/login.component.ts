import { Component } from '@angular/core';

import {Router} from "@angular/router";
import {AuthenticationControllerService} from "../../services/services/authentication-controller.service";
import {TokenService} from "../../services/security/token/token.service";

import {icon} from "@fortawesome/fontawesome-svg-core";
import {faSignIn, faUser} from "@fortawesome/free-solid-svg-icons";
import {AuthentificationDto} from "../../services/models/authentification-dto";




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(
    private router:Router,
    private authService:AuthenticationControllerService,
    private tokenService:TokenService
  ) {
  }
  authRequst:AuthentificationDto  ={
    granType:'password',
    password:'azaz1212',
    refreshToken:'sss',
    withRefreshToken:false,
    userName:'othmanzarrouk30@gmail.com'};




  errorMsg:Array<string> = [];
  eror:boolean=false;

  login() {
    this.errorMsg=[];
    this.tokenService.clearToken();
    this.authService.jwtToken({body:this.authRequst}).subscribe({
      next:(res)=>{
        this.eror=false;

        this.tokenService.token =res.accessToken as string;
        this.router.navigate(['dashboard']);
      },
      error:(err)=>{
        this.eror=true;
        this.errorMsg.push(err.error.error);
        console.log(err.error.error);
      }
    });
  }

  protected readonly icon = icon;
  protected readonly faUser = faUser;
  protected readonly faSignIn = faSignIn;
}
