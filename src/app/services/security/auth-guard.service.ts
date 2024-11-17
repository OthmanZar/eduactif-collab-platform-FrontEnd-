import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {TokenService} from "./token/token.service";
import {JwtDecoderService} from "./token/jwt-decoder.service";

export const AuthGuardService: CanActivateFn = (route, state) => {


  let token = inject(TokenService).token
  let router = inject(Router)
  let boll=false
  const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
  const timeExp:number=inject(JwtDecoderService).getExpiration(token);
  console.log(token);
  //console.log(token.length);
  if (token!=null && timeExp > currentTime) {
    return true;
  } else {
    localStorage.clear();
    router.navigate(['/login']);
    return false;
  }




};
