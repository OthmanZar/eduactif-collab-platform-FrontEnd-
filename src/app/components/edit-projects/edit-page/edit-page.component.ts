import {Component, OnInit} from '@angular/core';
import {ProjectToReturnTotal} from "../../../services/models/ProjectToReturnTotal";
import {ActivatedRoute} from "@angular/router";
import {Pdf} from "../../../services/models/pdf";
import {ProjectControllerService} from "../../../services/services/project-controller.service";
import {ProjectToSend} from "../../../services/models/project-to-send";
import {faCheck} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.css']
})
export class EditPageComponent implements OnInit {
  apiUrlImage:string="http://localhost:8080/images/";
  apiUrlVideo:string="http://localhost:8080/videos/";
  apiUrlReport = 'http://localhost:8080/report/';
  pdf:Pdf={pdfName:"trr"};
  project :ProjectToReturnTotal= {
    evaluationToReturns: [], image:[],
  report:this.pdf,
  meanEvaluations:0,
  totalEvaluations:0

  };

  projectTosend:ProjectToSend={};

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
    this.route.data.subscribe(value => {
      this.project=value['details'];
    });
    this.getAllDomaines();
  }

  constructor(
    private route:ActivatedRoute,
    private projectService:ProjectControllerService
  ) {
  }
  isOpen: boolean = false;
  isSuccess: boolean = false;


  closeModal() {
    this.isOpen = false;
  }

  closeModalSuccess() {
    this.isSuccess = false;

  }

  errorMsg: Array<string> = [];
  VideoError: string | null = null; // Variable to hold error messages
  previewVideo: string | null = null; // This will hold the base64 data URL for the video
  previewImages: string[] = [];
  previewVideoFile:any;
  previewImageFiles:any;
  previewReportFile:any;
  onVideoSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      // Clear previous video previews and error messages
      this.previewVideo = null;
      this.VideoError = null; // Assuming you have a fileError property for error messages

      const file = input.files[0]; // Get the selected file

      if (file) {
        const maxSizeInBytes = 9 * 1024 * 1024; // 9 MB in bytes
        if (file.size > maxSizeInBytes) {
          this.VideoError = 'The video size must be less than or equal to 9 MB.'; // Set error message
          input.value = ''; // Clear the input value
          return; // Skip further processing for this file
        }

        // If the file is valid, set it to project.video
        this.previewVideoFile = file;

        // Use FileReader to read the video file
        const reader = new FileReader();
        reader.onload = (e) => {
          this.previewVideo = e.target?.result as string; // Base64 URL
          console.log('Base64 Video URL:', this.previewVideo);
        };
        reader.readAsDataURL(file); // Read the video file as Data URL
      }
    }
  }


  ImageError: string | null = null; // Variable to hold error messages

  onImagesSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files) {
      if(input.files.length>2){
        this.ImageError = 'You can only upload a maximum of 2 images.';
        return;
      }
      // Clear previous previews and error messages
      this.previewImages = [];
      this.ImageError = null; // Clear previous error message

      // Limit to 2 images
      const files = Array.from(input.files).slice(0, 2);
      //this.projectTosend.images=[];
      this.previewImageFiles=[];
      // Maximum file size in bytes (4 MB)
      const maxSizeInBytes = 4 * 1024 * 1024;

      // Validate files and create URLs for preview
      files.forEach((file, index) => {
        // Only process the first two files
          if (file.size > maxSizeInBytes) {
            this.ImageError = 'Each image must be less than or equal to 4 MB.'; // Set error message
            input.value = ''; // Clear the input value
            return; // Skip further processing for this file
          }

          // If file is valid, add it to project.image and create a preview


          const reader = new FileReader();
          reader.onload = (e) => {
            this.previewImages.push(e.target?.result as string); // Add base64 data URL to previewImages
          };
          reader.readAsDataURL(file); // Read the image file as Data URL
        this.previewImageFiles.push(file);

      });
      // Limit the number of images in the preview

    }
  }

  fileError: string | null = null; // Variable to hold error messages
  previousReportInputValue: string = '';

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

        // Update the project.report with the file details
        this.previewReportFile = file;

        //console.log('File selected:', this.project.report);
      }
    } else {
      // Handle the case where the user cancels the selection
   //   this.project.report = null; // Reset the report if needed
    }
  }


  private updateReportName(file: File) {
    // Update the report name in the project object
    this.project.report.pdfName = file.name; // Assuming pdfName is a property of project.report
  }


  checkIfAllFieldsFilled(data: any): boolean {
    // Check each field to ensure it's not an empty string or undefined
    return Object.values(data).every(value => {
      return value !== "" && value !== undefined && value !== null;
    });
  }

  onSubmit() {
    this.errorMsg = [];
    this.projectTosend={
      report:this.previewReportFile?this.previewReportFile:undefined,
      images:this.previewImageFiles?this.previewImageFiles:undefined,
      studentId:this.project.studentId,
      professorId:this.project.professorId,
      isVisible:this.project.isVisible,
      isOpen:this.project.isOpen,
      description:this.project.description,
      domaine:this.project.domaine,
      name:this.project.name,
      video:this.previewVideoFile?this.previewVideoFile:undefined
    }
    console.log(this.projectTosend);
    //if (this.checkIfAllFieldsFilled(this.projectTosend)) {

      this.projectService.updateProject({body:this.projectTosend}).subscribe({
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
    }

  //}
  protected readonly faCheck = faCheck;
}
