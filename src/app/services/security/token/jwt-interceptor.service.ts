import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {TokenService} from "./token.service";
import {JwtDecoderService} from "./jwt-decoder.service";

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor(
    private token:TokenService,
    private decode:JwtDecoderService

  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.token.token;
    const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
    //const timeExp:number=this.decode.getExpiration(token);
  //  console.log(this.decode.getExpiration(token));
   // console.log(currentTime);
    if (token!=null ) {
      const timeExp:number=this.decode.getExpiration(token);
      if(timeExp<=currentTime){
        return next.handle(req);
      }
        const authReq = req.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        });
      //console.log(authReq);
      return next.handle(authReq);


    } else {
      return next.handle(req);
    }


  }
}
