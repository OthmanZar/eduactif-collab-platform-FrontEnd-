/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { BaseService } from '../base-service';
import { ApiConfiguration } from '../api-configuration';
import { StrictHttpResponse } from '../strict-http-response';

import { addNoteToStudent } from '../fn/professor-controller/add-note-to-student';
import { AddNoteToStudent$Params } from '../fn/professor-controller/add-note-to-student';
import { CoursToReturn } from '../models/cours-to-return';
import { deleteProfessor } from '../fn/professor-controller/delete-professor';
import { DeleteProfessor$Params } from '../fn/professor-controller/delete-professor';
import { getAllCourses } from '../fn/professor-controller/get-all-courses';
import { GetAllCourses$Params } from '../fn/professor-controller/get-all-courses';
import { getAllProfessors1 } from '../fn/professor-controller/get-all-professors-1';
import { GetAllProfessors1$Params } from '../fn/professor-controller/get-all-professors-1';
import { getAllProfessorsByDepartment } from '../fn/professor-controller/get-all-professors-by-department';
import { GetAllProfessorsByDepartment$Params } from '../fn/professor-controller/get-all-professors-by-department';
import { getAllSchoolYears } from '../fn/professor-controller/get-all-school-years';
import { GetAllSchoolYears$Params } from '../fn/professor-controller/get-all-school-years';
import { ProfessorToReturn } from '../models/professor-to-return';

import {
  GetProfessorByEmail$Params,
  getProfessorByEmailSmall
} from "../fn/professor-controller/get-professor-by-email-small";
import {ProfessorToReturnSmall} from "../models/professor-to-return-small";
import {getProfessorAllInfosByEmail} from "../fn/professor-controller/get-professor-by-email";
import {getProfessorAllInfosByID, GetProfessorByID$Params} from "../fn/professor-controller/get-professor-by-id";
import {SchoolYearAndCoursesReturn} from "../models/school-year-and-courses-return";
import {addNotesToStudents, AddNotesToStudents$Params} from "../fn/professor-controller/add-notes-to-students";

@Injectable({ providedIn: 'root' })
export class ProfessorControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addNoteToStudent()` */
  static readonly AddNoteToStudentPath = '/professor/note';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addNoteToStudent()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNoteToStudent$Response(params: AddNoteToStudent$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return addNoteToStudent(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addNoteToStudent$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNoteToStudent(params: AddNoteToStudent$Params, context?: HttpContext): Observable<boolean> {
    return this.addNoteToStudent$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }


  /** Path part for operation `addNoteToStudent()` */
  static readonly AddNotesToStudentsPath = '/professor/notes';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addNoteToStudent()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNotesToStudents$Response(params: AddNotesToStudents$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return addNotesToStudents(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addNoteToStudent$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addNotesToStudents(params: AddNotesToStudents$Params, context?: HttpContext): Observable<boolean> {
    return this.addNotesToStudents$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }


  /** Path part for operation `getAllProfessors1()` */
  static readonly GetAllProfessors1Path = '/professors';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllProfessors1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProfessors1$Response(params?: GetAllProfessors1$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProfessorToReturn>>> {
    return getAllProfessors1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllProfessors1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProfessors1(params?: GetAllProfessors1$Params, context?: HttpContext): Observable<Array<ProfessorToReturn>> {
    return this.getAllProfessors1$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProfessorToReturn>>): Array<ProfessorToReturn> => r.body)
    );
  }

  /** Path part for operation `getAllSchoolYears()` */
  static readonly GetAllSchoolYearsPath = '/professor/{id}/schoolYears';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSchoolYears()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSchoolYears$Response(params: GetAllSchoolYears$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<string>>> {
    return getAllSchoolYears(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllSchoolYears$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSchoolYears(params: GetAllSchoolYears$Params, context?: HttpContext): Observable<Array<string>> {
    return this.getAllSchoolYears$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<string>>): Array<string> => r.body)
    );
  }

  /** Path part for operation `getAllCourses()` */
  static readonly GetAllCoursesPath = '/professor/{id}/courses';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllCourses()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCourses$Response(params: GetAllCourses$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<SchoolYearAndCoursesReturn>>> {
    return getAllCourses(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllCourses$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllCourses(params: GetAllCourses$Params, context?: HttpContext): Observable<Array<SchoolYearAndCoursesReturn>> {
    return this.getAllCourses$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<SchoolYearAndCoursesReturn>>): Array<SchoolYearAndCoursesReturn> => r.body)
    );
  }

  /** Path part for operation `getAllProfessorsByDepartment()` */
  static readonly GetAllProfessorsByDepartmentPath = '/professor/department/{department}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllProfessorsByDepartment()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProfessorsByDepartment$Response(params: GetAllProfessorsByDepartment$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProfessorToReturn>>> {
    return getAllProfessorsByDepartment(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllProfessorsByDepartment$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllProfessorsByDepartment(params: GetAllProfessorsByDepartment$Params, context?: HttpContext): Observable<Array<ProfessorToReturn>> {
    return this.getAllProfessorsByDepartment$Response(params, context).pipe(
      map((r: StrictHttpResponse<Array<ProfessorToReturn>>): Array<ProfessorToReturn> => r.body)
    );
  }

  /** Path part for operation `deleteProfessor()` */
  static readonly DeleteProfessorPath = '/professor/{id}/{newProfId}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteProfessor()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProfessor$Response(params: DeleteProfessor$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return deleteProfessor(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteProfessor$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteProfessor(params: DeleteProfessor$Params, context?: HttpContext): Observable<boolean> {
    return this.deleteProfessor$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }


  /** Path part for operation `getProfByEmailSmall()` */
  static readonly GetProfessorByEmailSmallPath = '/professor/necessary/email/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudentByEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfessorByEmailSmall$Response(params: GetProfessorByEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<ProfessorToReturnSmall>> {
    return getProfessorByEmailSmall(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudentByEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfessorByEmailSmall(params: GetProfessorByEmail$Params, context?: HttpContext): Observable<ProfessorToReturnSmall> {
    return this.getProfessorByEmailSmall$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProfessorToReturnSmall>): ProfessorToReturnSmall => r.body)
    );
  }


  /** Path part for operation `getProfByEmailSmall()` */
  static readonly GetProfessorByEmailPath = '/professor/email/{email}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudentByEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfessorByEmail$Response(params: GetProfessorByEmail$Params, context?: HttpContext): Observable<StrictHttpResponse<ProfessorToReturn>> {
    return getProfessorAllInfosByEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudentByEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfessorByEmail(params: GetProfessorByEmail$Params, context?: HttpContext): Observable<ProfessorToReturn> {
    return this.getProfessorByEmail$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProfessorToReturn>): ProfessorToReturn => r.body)
    );
  }



  /** Path part for operation `getProfByEmailSmall()` */
  static readonly GetProfessorByIdlPath = '/professor/{id}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getStudentByEmail()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfessorAllInfosByID$Response(params: GetProfessorByID$Params, context?: HttpContext): Observable<StrictHttpResponse<ProfessorToReturn>> {
    return getProfessorAllInfosByID(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getStudentByEmail$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfessorAllInfosByID(params: GetProfessorByID$Params, context?: HttpContext): Observable<ProfessorToReturn> {
    return this.getProfessorAllInfosByID$Response(params, context).pipe(
      map((r: StrictHttpResponse<ProfessorToReturn>): ProfessorToReturn => r.body)
    );
  }


}
