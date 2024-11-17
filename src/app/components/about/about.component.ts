import { Component } from '@angular/core';
import {faBookOpen, faLaptopCode, faUsers} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent {

  protected readonly faLaptopCode = faLaptopCode;
  protected readonly faBookOpen = faBookOpen;
  protected readonly faUsers = faUsers;
}
