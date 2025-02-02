/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';

import { ProfessorToReturn } from '../../models/professor-to-return';
import { ProfessorToSend } from '../../models/professor-to-send';

export interface AddProfessor$Params {
      body: ProfessorToSend
}

export function addProfessor(http: HttpClient, rootUrl: string, params: AddProfessor$Params, context?: HttpContext): Observable<StrictHttpResponse<ProfessorToReturn>> {
  const rb = new RequestBuilder(rootUrl, addProfessor.PATH, 'post');
  if (params) {
    rb.body(params.body, 'multipart/form-data');
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<ProfessorToReturn>;
    })
  );
}

addProfessor.PATH = '/auth/register/professor';
