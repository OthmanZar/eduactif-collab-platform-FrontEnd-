import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectControllerService} from "../../services/services/project-controller.service";
import {ProjectToSend} from "../../services/models/project-to-send";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit{
  userType: string | null="";
  userId:number|null=null;
  constructor(
    private route: ActivatedRoute,
    private projectService:ProjectControllerService
  ) {
  }
  studentDisabled:boolean=false;
  teacherDisabled:boolean=false;

  studentId:number =0;
  teacherId: number =0;
  domaines :string[] | undefined;
  getAllDomaines(){
    this.projectService.getAllDomaines().subscribe({
      next:(res)=>{
        this.domaines=res;
      },
      error:(err)=>{
        console.log(err);
      }
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.userType = params.get('type');
      this.userId=Number(params.get('id'));
    });
    console.log(this.userId);
    if(this.userType=="student"){
      this.studentDisabled=true;
      if(this.userId!=null){
        this.studentId=this.userId;
      }


    }else if(this.userType=="professor"){
      this.teacherDisabled=true;
      if(this.userId!=null) {
        this.teacherId = this.userId;
      }
    }
    this.getAllDomaines();
  }
  errorMsg:Array<string> = [];

  isOpen: boolean = false;
  isSuccess:boolean=false;
  closeModal() {
    this.isOpen = false;
  }
  closeModalSuccess() {
    this.isSuccess = false;

  }


  project :any= {
    name: '',
    description: '',
    domaine: '',
    isVisible: true,

    isOpen: true,
    video: null as File | null,
    images: [] as File[],
    report: null as File | null,
  };

  previewImages: string[] = [];
  projectToSend:ProjectToSend={};

  VideoError: string | null = null; // Variable to hold error messages

  onVideoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0]; // Get the selected file

    if (file) {
      const maxSizeInBytes = 9 * 1024 * 1024; // 7 MB in bytes
      if (file.size > maxSizeInBytes) {
        this.VideoError = 'The Video size must be less than or equal to 9 MB.'; // Set error message
        input.value = ''; // Clear the input value
      } else {
        this.VideoError = null; // Clear error message
       this.project.video=file;
        console.log('File selected:', file);
      }
    }
  }
  ImageError: string | null = null; // Variable to hold error messages

  onImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      // Clear previous previews and error messages
      this.previewImages = [];
      this.ImageError = null; // Assuming you have a fileError property for error messages

      // Limit to 2 images
      const files = Array.from(input.files).slice(0, 2);
      this.project.images = []; // Initialize to empty array for valid files

      // Maximum file size in bytes (7 MB)
      const maxSizeInBytes = 4 * 1024 * 1024;

      // Validate files and create URLs for preview
      files.forEach(file => {
        if (file.size > maxSizeInBytes) {
          this.ImageError = 'Each image must be less than or equal to 2 MB.'; // Set error message
          input.value = ''; // Clear the input value
          return; // Skip further processing for this file
        }

        // If file is valid, add it to project.images and create a preview
        this.project.images.push(file);

        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewImages.push(e.target?.result as string);
        };
        reader.readAsDataURL(file);
      });
    }
  }

  fileError: string | null = null; // Variable to hold error messages

  onReportSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0]; // Get the selected file

    if (file) {
      const maxSizeInBytes = 7 * 1024 * 1024; // 7 MB in bytes
      if (file.size > maxSizeInBytes) {
        this.fileError = 'The file size must be less than or equal to 7 MB.'; // Set error message
        input.value = ''; // Clear the input value
      } else {
        this.fileError = null; // Clear error message
       this.project.report=file;
        console.log('File selected:', file);
      }
    }
  }

  checkIfAllFieldsFilled(data: any): boolean {
    // Check each field to ensure it's not an empty string or undefined
    return Object.values(data).every(value => {
      return value !== "" && value !== undefined && value !== null;
    });
  }
  onSubmit() {
    this.errorMsg=[];
    if (this.checkIfAllFieldsFilled(this.project)) {
      this.projectToSend={
        name:this.project.name,
        domaine:this.project.domaine,
        isOpen:this.project.isOpen,
        description:this.project.description,
        isVisible:this.project.isVisible,
        professorId:this.teacherId,
        studentId:this.studentId,
        images:this.project.images,
        report:this.project.report,
        video:this.project.video
      }

      this.projectService.addProject({body:this.projectToSend}).subscribe({
        next:(res)=>{
          this.isSuccess=true;
        },
        error:(err)=>{
          this.isOpen=true;
          console.log(err);
          if(err.validationsErrors) {
            this.errorMsg = err.validationsErrors;
          }else{
            this.errorMsg.push(err.error.error);
          }
        }
      })

    }else{
      this.isOpen=true;
      this.errorMsg.push("Some Fields Are Empty");
    console.log(this.project);
    }

    // Perform the API call to upload the files along with other project data
  }


  protected readonly faCheck = faCheck;
}
