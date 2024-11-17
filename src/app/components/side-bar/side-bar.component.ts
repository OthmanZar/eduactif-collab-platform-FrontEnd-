import { Component } from '@angular/core';
import {faRightFromBracket} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  protected readonly faRightFromBracket = faRightFromBracket;
}
