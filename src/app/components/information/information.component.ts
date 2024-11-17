import {Component, Input, OnInit} from '@angular/core';
import {StudentControllerService} from "../../services/services/student-controller.service";
import {GetHistory$Params} from "../../services/fn/student-controller/get-history";
import {HistoryToReturn} from "../../services/models/history-to-return";
import {ActivatedRoute, Router} from "@angular/router";
import {NoteToReturn} from "../../services/models/note-to-return";
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.css']
})
export class InformationComponent implements OnInit{
  private emailTO: string | null="";

  constructor(
    private route: ActivatedRoute,
    private studentService:StudentControllerService,
    private router:Router
  ) {
  }
  ngOnInit(){

    this.route.paramMap.subscribe(params => {
      this.emailTO = params.get('email');
    });

    if(this.emailTO!=null){
      this.getInformations(this.emailTO);
    }
    this.checkSection();

     // console.log(this.email);
  }

   email:string="";

  section: string | null = null;

  getEmail():boolean{
    if(this.email==""){
      return false;
    }else{
      return true;
    }
}
  information: HistoryToReturn[]=[] ;

  getInformations( email:string){
    console.log(this.email);
    this.studentService.getHistory({email}).subscribe({
      next:(res)=>{
        this.information=res;
      },
      error:(err)=>{
        console.log(err);
      }
    });
}
  checkSection(): void {
    const currentUrl = this.router.url;
    const dashboardIndex = currentUrl.indexOf('/dashboard');


    const pathAfterDashboard = currentUrl.substring(dashboardIndex + '/dashboard'.length).split('/')[1];


    if (pathAfterDashboard === 'information') {
      this.section = 'information';
      console.log(this.section);
    } else if (pathAfterDashboard === 'notes') {
      this.section = 'notes';
      console.log(this.section);
    } else {
      this.section = null;
    }


  }


  getRoute(info: any): string[] {
    if (this.section === 'information') {
      return ['/dashboard/information/details', info.schoolYearName || ''];
    } else {
      return ['/dashboard/notes', this.emailTO,info.schoolYearName || '' , info.type,info.date];
    }
  }

}
