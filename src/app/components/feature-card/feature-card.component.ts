import {Component, Input} from '@angular/core';
import {faChalkboardTeacher, faUserGraduate, IconDefinition} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-feature-card',
  templateUrl: './feature-card.component.html',
  styleUrls: ['./feature-card.component.css']
})
export class FeatureCardComponent {
  @Input() icon!: IconDefinition; // Icon as input
  @Input() title!: string;
  @Input() description!: string;
  @Input() link!: string;


  protected readonly faChalkboardTeacher = faChalkboardTeacher;
}
