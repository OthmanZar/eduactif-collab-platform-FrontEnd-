import { Component } from '@angular/core';
import {
  faBook, faChalkboard,
  faChalkboardTeacher,
  faGraduationCap, faLaptopCode,
  faLightbulb, faMicrophone,
  faUser,
  faUserGraduate
} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

    protected readonly faUserGraduate = faUserGraduate;

  protected readonly faChalkboardTeacher = faChalkboardTeacher;
  protected readonly faUser = faUser;
  protected readonly faBook = faBook;
  protected readonly faGraduationCap = faGraduationCap;
  protected readonly faLightbulb = faLightbulb;
  protected readonly faChalkboard = faChalkboard;
  protected readonly faMicrophone = faMicrophone;
  protected readonly faLaptopCode = faLaptopCode;
}
