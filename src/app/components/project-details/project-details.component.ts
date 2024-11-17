import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProjectToReturn} from "../../services/models/ProjectToReturn";
import {ProjectToReturnTotal} from "../../services/models/ProjectToReturnTotal";
import {HttpClient} from "@angular/common/http";
import { Pdf } from 'src/app/services/models/pdf';
import {faEnvelope, faMessage, faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";
import {EvaluationToReturn} from "../../services/models/evaluation-to-return";
import {RequestControllerService} from "../../services/services/request-controller.service";
import {RequestToReturn} from "../../services/models/request-to-return";
import {EvaluationControllerService} from "../../services/services/evaluation-controller.service";
import {EvaluationToSend} from "../../services/models/evaluation-to-send";


@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit{

  constructor(
    private route: ActivatedRoute,
    private http:HttpClient,
    private requestService:RequestControllerService,
    private evaluationService:EvaluationControllerService
  ) {
  }

  ngOnInit(): void {
    this.route.data.subscribe(value => {
      this.details=value['details'];
    })
    this.getRequests(this.id);
    this.route.paramMap.subscribe(params => {
      this.project = params.get('project');
    });
  this.exists= this.details.evaluationToReturns.some(item => item.userId === this.id);
  if(this.details.studentId==this.id||this.details.professorId==this.id){
    this.exists=true;

  }
  }

  project: string | null="";
  id:number=Number(localStorage.getItem("key"));
  exists:boolean= false;

  newReview: { evaluation: number; comment: string;} = {
    evaluation: 0,
    comment: '',


  };

  setRating(rating: number): void {
    this.newReview.evaluation = rating;
  }
  submitReview(): void {
    if (this.newReview.evaluation && this.newReview.comment ) {

      let review : EvaluationToSend={
        evaluation:this.newReview.evaluation,
        comment:this.newReview.comment,
        projectName:this.project||'',
        id:this.id,
      }

      this.evaluationService.addEvaluation({body:review}).subscribe({
        next:(res)=>{
          if(!this.exists){
            this.details.evaluationToReturns.push(res);
            this.details.totalEvaluations++;
            this.details.meanEvaluations =
              this.details.evaluationToReturns.reduce((sum, review) => sum + review.evaluation, 0) / this.details.totalEvaluations;
              this.exists=true;
            // Update the count of evaluations
            this.evaluationsCount[this.newReview.evaluation]++;
          }else{

          }

        },
        error:(err)=>{
          alert(err);
          console.log(err);
        }
      });

      // Update total evaluations and mean


      // Clear the form after submission
      this.newReview = {
        evaluation: 0,
        comment: '',

      };
    } else {
      alert('Please fill in all fields before submitting your review.');
    }
  }
  hoverRating(rating: number): void {
    this.hoveredRating = rating;
  }
  hoveredRating: number = 0; // Holds the rating being hovered




  apiUrlImage:string="http://localhost:8080/images/";
  apiUrlVideo:string="http://localhost:8080/videos/";
  pdf:Pdf={pdfName:""};
  details:ProjectToReturnTotal={
    image:[],
    report:this.pdf,
    totalEvaluations:0,
    evaluationToReturns:[],
    meanEvaluations:0
  };
  private apiUrlReport = 'http://localhost:8080/report/';
  downloadPdf(fileName: string): void {
    this.http.get(`${this.apiUrlReport}${fileName}`, { responseType: 'blob' }).subscribe(
      (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = fileName;
        link.click();
        window.URL.revokeObjectURL(link.href); // Clean up the URL object
      },
      (error) => {
        console.error('Error downloading the PDF', error);
      }
    );
  }
  getFullStars(evaluation: number): number[] {
    const full = Math.floor(evaluation);
    return Array(full).fill(0);
  }

  // Check if there's a half star
  hasHalfStar(evaluation: number): boolean {
    return (evaluation % 1) >= 0.25; // Change this to 0.25 for more precision
  }

  // Get the number of empty stars to fill the remaining up to 5
  getEmptyStars(evaluation: number): number[] {
    const full = Math.floor(evaluation);
    const half = this.hasHalfStar(evaluation) ? 1 : 0;
    const empty = 5 - full - half;
    return Array(empty).fill(0);
  }
  reviews:EvaluationToReturn[]=[
  ];


  get evaluationsCount(): { [key: number]: number } {
    return this.details.evaluationToReturns.reduce((acc, curr) => {
      const roundedEvaluation = Math.round(curr.evaluation); // Round to nearest integer
      if (roundedEvaluation >= 1 && roundedEvaluation <= 5) {
        acc[roundedEvaluation] = (acc[roundedEvaluation] || 0) + 1;
      }
      return acc;
    }, {} as { [key: number]: number });
  }


  isOpen:boolean=false;

  changeIsOpen() {
      this.isOpen=true;
   // console.log("test");
  }

  requests:RequestToReturn[]=[];
  closeModal() {
    this.isOpen = false;  // Properly close the modal
  }
  getRequests(id:number){
    this.requestService.getRequestsOfAnUser({id}).subscribe({
      next:(res)=>{
    this.requests=res;
      },
      error:(err)=>{
        console.log(err);
      },
    })
  }
  filteredRequests: RequestToReturn[] = [];
  filterRequests(name: string) {
    this.filteredRequests = this.requests.filter(request => request.projectName === name);

  }
  textToShowOnHover:string='';
  hasRequests(name: string): boolean {
    if(this.details.studentId==this.id||this.details.professorId==this.id){
      this.textToShowOnHover="You are The Owner you can't send request"
      return true;
    }
    this.textToShowOnHover="You already sent a Request"
    this.filterRequests(name);


    return this.filteredRequests.length > 0;
  }

  protected readonly faStar = faStar;
  protected readonly faStarHalfAlt = faStarHalfAlt;
  protected readonly faMessage = faMessage;
  protected readonly faEnvelope = faEnvelope;


}
