import {Component, Input, OnInit} from '@angular/core';
import {faCheck} from "@fortawesome/free-solid-svg-icons";
import {StudentControllerService} from "../../services/services/student-controller.service";
import {NoteToReturn} from "../../services/models/note-to-return";
import {ActivatedRoute} from "@angular/router";
import {SchoolYearControllerService} from "../../services/services/school-year-controller.service";
import {forkJoin, Observable} from "rxjs";

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit{
  private emailTO: string | null="";
   schoolName: string | null="";
   type:string | null="";
   date:string | null="";
  constructor(
    private studentService:StudentControllerService,
    private route: ActivatedRoute,
    private schoolService: SchoolYearControllerService
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.emailTO = params.get('email');
    });
    this.route.paramMap.subscribe(params => {
      this.schoolName = params.get('schoolName');
    });
    this.route.paramMap.subscribe(params => {
      this.type = params.get('type');
    });
    this.route.paramMap.subscribe(params => {
      this.date = params.get('date');
    });

    if (this.schoolName != null && this.emailTO != null) {

      forkJoin([
        this.getAllCoursesOfSchoolYear(this.schoolName),
        this.getAllCourses(this.emailTO)
      ]).subscribe({
        next: ([coursesOfSchoolYear, coursesByEmail]) => {

          this.cousesName = coursesOfSchoolYear;
          this.notes = coursesByEmail;


          this.getCombinedNotes();
        },
        error: (err) => {
          console.error('Error fetching data', err);
        }
      });
    }
    console.log(this.cousesName);
    }


    notesFinal:NoteToReturn[]=[];
  getCombinedNotes() {

    this.cousesName.map(course => {

      const note = this.notes.find(n => n.courName === course);
      const noteToPush : NoteToReturn={
        value:note ? note.value : -1,
        comment:note ? note.comment : '',
        courName:course
      }


      this.notesFinal.push(noteToPush);

    });
  }

  notes:NoteToReturn[]=[];



  getAllCoursesOfSchoolYear(name: string): Observable<string[]> {
    return this.schoolService.getAllCoursesOfSchoolYear({ name });
  }

  getAllCourses(email: string): Observable<NoteToReturn[]> {
    return this.studentService.getAllNotes({ email });
  }
  cousesName:Array<string>=[];


  protected readonly faCheck = faCheck;
}
