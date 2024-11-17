import {Component, OnInit} from '@angular/core';
import {RequestToReturn} from "../../services/models/request-to-return";
import {RequestControllerService} from "../../services/services/request-controller.service";
import {ActivatedRoute} from "@angular/router";
import {changeState} from "../../services/fn/request-controller/change-state";
import {RequestToChange} from "../../services/models/request-to-change";

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit{

  project:string|null="";
  constructor(
    private requestService:RequestControllerService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.project = params.get('project');
    });

    if(this.project!=null){
      this.getRequestsOfProject(this.project);
    }
  }


  getRequestsOfProject(name:string){
    this.requestService.getRequestsOfAProject({name}).subscribe({
      next:(res)=>{
        this.requests=res;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  requests:RequestToReturn[]=[];

  changeState:RequestToChange={}

  acceptRequest(project:string ,userId:number) {
    this.changeState={
      projectName:project,
      idOwner:Number(localStorage.getItem("key")),
      idUser:userId,
      state:"Accepted"
    }
    this.requestService.changeState({body: this.changeState}).subscribe({
      next:(res)=>{
        const   index = this.requests.findIndex(request => request.fullName === res.fullName);
        if (index !== -1) {
          this.requests[index] = res;
        }
      },
      error:(err)=>{
        console.log(err);
      }
    });

  }

  cancelRequest(project:string ,userId:number) {
    this.changeState={
      projectName:project,
      idOwner:Number(localStorage.getItem("key")),
      idUser:userId,
      state:"Canceled"
    }
    this.requestService.changeState({body: this.changeState}).subscribe({
      next:(res)=>{
       // this.requests = this.requests.filter(request => request.fullName !== res.fullName);
        //this.requests.push(res);
     const   index = this.requests.findIndex(request => request.fullName === res.fullName);
        if (index !== -1) {
          this.requests[index] = res;
        }
      },
      error:(err)=>{
        console.log(err);
      }
    });

  }
}
