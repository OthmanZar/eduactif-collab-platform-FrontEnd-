import {JwtPayload} from "jwt-decode";

export interface MyJwtPayload extends JwtPayload{
  scope?:string[]
}
