import { Component } from '@angular/core';
import {faChalkboardTeacher, faUserGraduate} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-step1',
  templateUrl: './step1.component.html',
  styleUrls: ['./step1.component.css']
})
export class Step1Component {
  selectedRole: 'student' | 'teacher' | null = null;
  formData: any = {
    email: '',
    phone: '',
    sexe: '',
    firstname: '',
    lastname: '',
    birthday: '',
    password: '',
    rePassword: '',
    department: '',
    course: ''
  };
  protected readonly faUserGraduate = faUserGraduate;
  protected readonly faChalkboardTeacher = faChalkboardTeacher;
}
