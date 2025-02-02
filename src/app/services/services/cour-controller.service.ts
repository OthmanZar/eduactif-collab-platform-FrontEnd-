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

import { addCour } from '../fn/cour-controller/add-cour';
import { AddCour$Params } from '../fn/cour-controller/add-cour';
import { deleteCours } from '../fn/cour-controller/delete-cours';
import { DeleteCours$Params } from '../fn/cour-controller/delete-cours';
import { getAllSchoolYears1 } from '../fn/cour-controller/get-all-school-years-1';
import { GetAllSchoolYears1$Params } from '../fn/cour-controller/get-all-school-years-1';
import { getCourById } from '../fn/cour-controller/get-cour-by-id';
import { GetCourById$Params } from '../fn/cour-controller/get-cour-by-id';
import { getProfessorByEmail } from '../fn/cour-controller/get-professor';
import { GetProfessor$Params } from '../fn/cour-controller/get-professor';

@Injectable({ providedIn: 'root' })
export class CourControllerService extends BaseService {
  constructor(config: ApiConfiguration, http: HttpClient) {
    super(config, http);
  }

  /** Path part for operation `addCour()` */
  static readonly AddCourPath = '/cours';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `addCour()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCour$Response(params: AddCour$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return addCour(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `addCour$Response()` instead.
   *
   * This method sends `application/json` and handles request body of type `application/json`.
   */
  addCour(params: AddCour$Params, context?: HttpContext): Observable<string> {
    return this.addCour$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getCourById()` */
  static readonly GetCourByIdPath = '/cours/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getCourById()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCourById$Response(params: GetCourById$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getCourById(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getCourById$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getCourById(params: GetCourById$Params, context?: HttpContext): Observable<string> {
    return this.getCourById$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `deleteCours()` */
  static readonly DeleteCoursPath = '/cours/{name}';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `deleteCours()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCours$Response(params: DeleteCours$Params, context?: HttpContext): Observable<StrictHttpResponse<boolean>> {
    return deleteCours(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `deleteCours$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  deleteCours(params: DeleteCours$Params, context?: HttpContext): Observable<boolean> {
    return this.deleteCours$Response(params, context).pipe(
      map((r: StrictHttpResponse<boolean>): boolean => r.body)
    );
  }

  /** Path part for operation `getAllSchoolYears1()` */
  static readonly GetAllSchoolYears1Path = '/cours/{name}/schoolYears';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getAllSchoolYears1()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSchoolYears1$Response(params: GetAllSchoolYears1$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getAllSchoolYears1(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getAllSchoolYears1$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getAllSchoolYears1(params: GetAllSchoolYears1$Params, context?: HttpContext): Observable<string> {
    return this.getAllSchoolYears1$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

  /** Path part for operation `getProfessor()` */
  static readonly GetProfessorPath = '/cours/{name}/professor';

  /**
   * This method provides access to the full `HttpResponse`, allowing access to response headers.
   * To access only the response body, use `getProfessor()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfessor$Response(params: GetProfessor$Params, context?: HttpContext): Observable<StrictHttpResponse<string>> {
    return getProfessorByEmail(this.http, this.rootUrl, params, context);
  }

  /**
   * This method provides access only to the response body.
   * To access the full response (for headers, for example), `getProfessor$Response()` instead.
   *
   * This method doesn't expect any request body.
   */
  getProfessor(params: GetProfessor$Params, context?: HttpContext): Observable<string> {
    return this.getProfessor$Response(params, context).pipe(
      map((r: StrictHttpResponse<string>): string => r.body)
    );
  }

}
