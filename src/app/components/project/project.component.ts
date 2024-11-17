import {Component, Input, OnInit} from '@angular/core';
import {
  faBuilding,
  faChalkboardTeacher,
  faRightFromBracket,
  faStar,
  faUserGraduate
} from "@fortawesome/free-solid-svg-icons";
import {ProjectControllerService} from "../../services/services/project-controller.service";
import {ProjectToReturn} from "../../services/models/ProjectToReturn";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  ngOnInit(): void {
    this.route.data.subscribe(value => {
      this.projects=value['projects'];
      this.filteredProjects = this.projects;
   })
  }

  constructor(
    private route: ActivatedRoute,
    private projectService:ProjectControllerService
  ) {
  }

  apiUrl:string="http://localhost:8080/images/";
  projects:ProjectToReturn[]=[];
  searchTerm: string = '';
  filteredProjects: ProjectToReturn[] = [];
  filterProjects() {
    if (!this.searchTerm) {
      this.filteredProjects = this.projects; // If searchTerm is empty, show all projects
      return;
    }

    this.filteredProjects = this.projects.filter(project =>
      project.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

  }



  protected readonly faRightFromBracket = faRightFromBracket;
  protected readonly faChalkboardTeacher = faChalkboardTeacher;
  protected readonly faUserGraduate = faUserGraduate;
  protected readonly faBuilding = faBuilding;
  protected readonly faStar = faStar;


    protected readonly open = open;

    isOpen=false;
  changeState() {
    this.isOpen=!this.isOpen;
    this.isProfessorSearchVisible = false;
    this.isStudentSearchVisible=false;
    this.isDomainChooserVisible=false;
    this.isOpenChooserVisible=false;
  }

  isDomainChooserVisible: boolean = false;
  isProfessorSearchVisible:boolean=false;
  isStudentSearchVisible:boolean=false;
  isOpenChooserVisible:boolean=false;
  domaines :string[] | undefined;
  professorForSearch:string="";
  studentForSearch:string="";

  getAllDomaines(){
    this.projectService.getAllDomaines().subscribe({
      next:(res)=>{
        this.domaines=res;

      },
      error:(err)=>{
        console.log(err);
      }
    });
  } // List of domains

  // Method to show domain chooser
  showDomainChooser() {
    this.getAllDomaines();
    this.isDomainChooserVisible = !this.isDomainChooserVisible;
  }

  // Method to handle domain selection
  onDomainSelect(event: any) {
    const selectedDomain = event.target.value;

      this.doSomethingWithDomain(selectedDomain);

    this.isOpen=false;
    // Perform any action when a domain is selected

   // this.isDomainChooserVisible = false; // Hide the chooser after selection
  }

  // Action to perform after domain selection


  doSomethingWithDomain(domain: string) {
    // Implement your logic here
    return  this.filteredProjects = this.projects.filter(project =>
      project.domaine?.includes(domain)
    );
  }


  showProfessorInput() {

    this.isProfessorSearchVisible = !this.isProfessorSearchVisible;
  }
  showStudentInput(){
    this.isStudentSearchVisible= !this.isStudentSearchVisible;
  }
  professorSearch() {
    if (!this.professorForSearch) {
      this.filteredProjects = this.projects; // If searchTerm is empty, show all projects
      return;
    }

    this.filteredProjects = this.projects.filter(project =>
      project.professorFullName?.toLowerCase().includes(this.professorForSearch.toLowerCase())
    );
  }
  studentSearch(){
    if (!this.studentForSearch) {
      this.filteredProjects = this.projects; // If searchTerm is empty, show all projects
      return;
    }

    this.filteredProjects = this.projects.filter(project =>
      project.studentFullName?.toLowerCase().includes(this.studentForSearch.toLowerCase())
    );
  }

  showOpenChooser() {
    this.isOpenChooserVisible=!this.isOpenChooserVisible;
  }

  onOpenSelect(event: any) {
    const selectedType = event.target.value;
    if(selectedType=="True"){
      this.isOpen=false;
      return this.filteredProjects = this.projects.filter(project =>
        project.isOpen
      );

    }else{
      this.isOpen=false;
      return this.filteredProjects = this.projects.filter(project =>
        !project.isOpen
      );
    }

  }

  sortASCByDate(){
    this.projects.sort((a, b) => {
      // Convert createdAt to Date objects for comparison
      const dateA = new Date(a.createdAt || '');
      const dateB = new Date(b.createdAt || '');

      return dateA.getTime() - dateB.getTime();  // ASC order
    });
    this.isOpen=false;
  }
  sortDESCByDate(){
    this.projects.sort((a, b) => {
      // Convert createdAt to Date objects for comparison
      const dateA = new Date(a.createdAt || '');
      const dateB = new Date(b.createdAt || '');

      return dateB.getTime() - dateA.getTime();  // ASC order
    });
    this.isOpen=false;
  }

  resetAll() {
    this.filteredProjects=this.projects;
    this.isOpen=false;
  }
}
