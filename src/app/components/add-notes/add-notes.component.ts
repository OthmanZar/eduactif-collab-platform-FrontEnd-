import {Component, OnInit} from '@angular/core';
import {CourControllerService} from "../../services/services/cour-controller.service";
import {ProfessorControllerService} from "../../services/services/professor-controller.service";
import {CoursToReturn} from "../../services/models/cours-to-return";
import {SchoolYearAndCoursesReturn} from "../../services/models/school-year-and-courses-return";
import {SchoolYearControllerService} from "../../services/services/school-year-controller.service";
import {StudentDtoToReturnSmall} from "../../services/models/student-dto-to-small-return";
import {NoteToSend} from "../../services/models/note-to-send";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-add-notes',
  templateUrl: './add-notes.component.html',
  styleUrls: ['./add-notes.component.css']
})
export class AddNotesComponent implements OnInit {

  constructor(
    private professorService: ProfessorControllerService,
    private schoolYearService: SchoolYearControllerService,
    private route: ActivatedRoute
  ) {}

  id: number = 0;
  courses: SchoolYearAndCoursesReturn[] = [];
  students: StudentDtoToReturnSmall[] = [];
  noteToSend: NoteToSend[] = [];
  selectedCourse: string | undefined;
  selectedSchoolYear: string | undefined;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = Number(params.get('id'));
    });
    this.getAllCoursesOfProfessor(this.id);
  }

  getAllCoursesOfProfessor(id: number) {
    this.professorService.getAllCourses({id}).subscribe({
      next: (res) => {
        this.courses = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  // Triggered when a school year is selected
  onSchoolYearChange(event: any, course: string | undefined) {
    this.selectedSchoolYear = event.target.value;
    this.selectedCourse = course;

    // Clear previous students and notes when changing the selection
    this.noteToSend = [];

    // Fetch new students for the selected school year
    this.getAllStudentsOfSchoolYear(this.selectedSchoolYear!);
  }

  getAllStudentsOfSchoolYear(name: string) {
    this.schoolYearService.getAllStudents1({name}).subscribe({
      next: (res) => {
        this.students = res;

        // Prepare noteToSend array for the new students
        this.noteToSend = res.map(re => ({
          idStudent: re.id,
          idProf: this.id,
          comment: '',
          value: 0,
          coursName: this.selectedCourse // Make sure course name is added
        }));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  sendGrade(student: NoteToSend,course:string) {
    student.coursName=course;
    this.professorService.addNoteToStudent({body: student}).subscribe({
      next: (res) => {
        console.log("Grade submitted successfully");
      },
      error: (err) => {
        console.log(err);
      }
    });

    // Logging student information
    console.log(student.idStudent);
    console.log(student.value);
    console.log(student.comment);
    console.log(student.coursName);
    console.log(student);
  }

  onDoneClick(students: NoteToSend[],course:string) {
    students.map(value => value.coursName=course);
    this.professorService.addNotesToStudents({body: students}).subscribe({
      next: (res) => {
        console.log("Grade submitted successfully");
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getNameById(id:number|undefined){
    const student = this.students.find(value => value.id === id);

    return student ? student.fullName : undefined;
  }
}
