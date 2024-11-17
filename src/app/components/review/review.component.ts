import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {EvaluationControllerService} from "../../services/services/evaluation-controller.service";
import {EvaluationToReturn} from "../../services/models/evaluation-to-return";
import {
  GetAllEvaluationsOfProject$Params
} from "../../services/fn/evaluation-controller/get-all-evaluations-of-project";
import {faStar, faStarHalfAlt} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit{
  project: string | null="";
  apiUrl:string="http://localhost:8080/images/";

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.project = params.get('project');
    });
    if(this.project!=null) {
      this.getAllReviews(this.project);
    }
  }

  constructor(
    private route: ActivatedRoute,
    private evaluationsService:EvaluationControllerService
  ) {
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



  getAllReviews(name:string){
    console.log(this.evaluationsService);
    this.evaluationsService.getAllEvaluationsOfProject({name}).subscribe({
        next:(res)=>{
         this.reviews=res;
        },
        error:(err)=>{
          console.log(err);
        }
      });
  }


  protected readonly faStar = faStar;
  protected readonly faStarHalfAlt = faStarHalfAlt;
}
