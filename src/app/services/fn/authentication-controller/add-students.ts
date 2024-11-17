/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { StudentDtoToReturn } from '../../models/student-dto-to-return';
import { StudentDtoToSend } from '../../models/student-dto-to-send';

export interface AddStudents$Params {
      body: StudentDtoToSend
}

export function addStudents(http: HttpClient, rootUrl: string, params: AddStudents$Params, context?: HttpContext): Observable<StrictHttpResponse<StudentDtoToReturn>> {
  const rb = new RequestBuilder(rootUrl, addStudents.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<StudentDtoToReturn>;
    })
  );
}

addStudents.PATH = '/auth/register/student';
