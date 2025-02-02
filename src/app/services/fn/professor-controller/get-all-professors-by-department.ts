/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProfessorToReturn } from '../../models/professor-to-return';

export interface GetAllProfessorsByDepartment$Params {
  department: 'BackendDevelopemet' | 'FullStackDevelopement' | 'FrontDevelopement' | 'AI_MachineLearning';
}

export function getAllProfessorsByDepartment(http: HttpClient, rootUrl: string, params: GetAllProfessorsByDepartment$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProfessorToReturn>>> {
  const rb = new RequestBuilder(rootUrl, getAllProfessorsByDepartment.PATH, 'get');
  if (params) {
    rb.path('department', params.department, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ProfessorToReturn>>;
    })
  );
}

getAllProfessorsByDepartment.PATH = '/professor/department/{department}';
