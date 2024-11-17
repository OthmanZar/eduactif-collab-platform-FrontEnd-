import { Component } from '@angular/core';
import {faChalkboardTeacher, faUserGraduate} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isDropdownOpen = false;

  constructor(private router: Router,

  ) {
  }
  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  login(role: 'student' | 'professor') {
    console.log(`Logging in as: ${role}`);

    // Navigate to the login page based on the role


    this.isDropdownOpen = false; // Close the dropdown after selection
  }

  protected readonly faUserGraduate = faUserGraduate;
  protected readonly faChalkboardTeacher = faChalkboardTeacher;
}
