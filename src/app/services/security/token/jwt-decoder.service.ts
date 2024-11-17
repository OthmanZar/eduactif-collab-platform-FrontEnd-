import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import {MyJwtPayload} from "./MyJwtPayload";

@Injectable({
  providedIn: 'root'
})
export class JwtDecoderService {
  constructor() { }



   decode(token:string):MyJwtPayload{
     return jwtDecode(token);
   }

   ifContainsRoles(roles: string, token:string){
    const decodeToken =this.decode(token);

    return !!decodeToken.scope?.includes(roles);

   }
   getRole(token:string){
     const decodeToken =this.decode(token);

     return decodeToken.scope;
   }

   getEmail(token:string){
     const decodeToken =this.decode(token);
      let email:string="";

     return decodeToken.sub;
   }

   getExpiration(token:string){
     const decodeToken =this.decode(token);
      const expiration=decodeToken.exp;

      if(expiration==undefined){
        return 0;
      }else{
        return expiration;
      }


   }

}
