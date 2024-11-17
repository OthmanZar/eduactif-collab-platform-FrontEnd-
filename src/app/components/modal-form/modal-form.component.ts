import {Component, EventEmitter, Input, Output} from '@angular/core';
import {RequestControllerService} from "../../services/services/request-controller.service";
import {RequestToSend} from "../../services/models/request-to-send";

@Component({
  selector: 'app-modal-form',
  templateUrl: './modal-form.component.html',
  styleUrls: ['./modal-form.component.css']
})
export class ModalFormComponent  {
 @Input() isOpen:boolean=false;

 constructor(
   private requestService:RequestControllerService
 ) {
 }
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  closeModal() {
    this.isOpen=false;
    this.resetForm();
    this.close.emit();
  }

  @Input() userId:number=0;
  @Input() projectName:string="";
  purpose:string='';
  title:string="";

  request:RequestToSend={
   projectName:"",
    purpose:"",
    title:"",
    userId:0,
  }
  errorMessages: string[] = [];
  error:boolean=false;

  sendRequest() {
    this.errorMessages = [];

    if (!this.title || !this.purpose) {
      if (!this.title) {
        this.errorMessages.push("Title is required.");
        this.error=true;
      }
      if (!this.purpose) {
        this.errorMessages.push("Purpose is required.");
        this.error=true;
      }
      return; // Don't proceed if validation fails
    }

    this.request={
      projectName:this.projectName,
      userId:this.userId,
      purpose:this.purpose,
      title:this.title
    }
    this.requestService.addRequest({body:this.request}).subscribe({
          next:(res)=>{
            this.errorMessages=[];
            this.isOpen=false;
            this.error=false;
            this.close.emit();
            this.isOpen=false;
          },

      error:(err)=>{
        console.log(err);
        this.errorMessages.push(err.error);
        this.error=true;
      }
    })
  }

  resetForm() {
    this.title = '';
    this.purpose = '';
    this.errorMessages = [];
    this.error=false;
  }
}
