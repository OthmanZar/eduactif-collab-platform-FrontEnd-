import {Component, Input, OnInit} from '@angular/core';
import {ProjectControllerService} from "../../services/services/project-controller.service";
import {ProjectToReturn} from "../../services/models/ProjectToReturn";

import {ActivatedRoute} from "@angular/router";
import {ProjectToReturnTotal} from "../../services/models/ProjectToReturnTotal";


@Component({
  selector: 'app-edit-projects',
  templateUrl: './edit-projects.component.html',
  styleUrls: ['./edit-projects.component.css']
})
export class EditProjectsComponent implements OnInit{
   emailTO: number =0;
   userType: string | null= "";

  constructor(
      private projectService:ProjectControllerService,
      private route: ActivatedRoute,

    ) {
    }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.emailTO = Number(params.get('email'));
      this.userType=params.get('userType');
    });
    if(this.emailTO!=0) {
      if(this.userType?.toUpperCase()=="STUDENT"){
        this.getAllProjects(this.emailTO);
      }else if(this.userType?.toUpperCase()=="PROFESSOR"){
        this.getAllProjectsByProfessor(this.emailTO);
      }


    }

  }
  isNaN(value: any): boolean {
    return isNaN(value);
  }
  apiUrlImage:string="http://localhost:8080/images/";
  projects:ProjectToReturnTotal[]=[];
  searchTerm: string = '';
  filteredProjects: ProjectToReturnTotal[] = [];

  filterProjects() {
    if (!this.searchTerm) {
      this.filteredProjects = this.projects; // If searchTerm is empty, show all projects
      return;
    }

    this.filteredProjects = this.projects.filter(project =>
      project.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

  }

  getAllProjects(id:number){
    this.projectService.getAllProjectsByStudent({id}).subscribe({
      next:(res)=>{

          this.projects=res;
        this.filteredProjects=this.projects;


      },
      error:(err)=>{
        console.log(err);
      }

    });


  }

  getAllProjectsByProfessor(id:number){
    this.projectService.getAllProjectsByProfessor({id}).subscribe({
      next:(res)=>{

        this.projects=res;
        this.filteredProjects=this.projects;


      },
      error:(err)=>{
        console.log(err);
      }

    });


  }
}
