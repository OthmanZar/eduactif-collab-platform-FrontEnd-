/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import {ProjectToReturn} from "../../models/ProjectToReturn";
import {ProjectToReturnTotal} from "../../models/ProjectToReturnTotal";


export interface GetAllProjectsByStudent$Params {
  id: number;
}

export function getAllProjectsByStudent(http: HttpClient, rootUrl: string, params: GetAllProjectsByStudent$Params, context?: HttpContext): Observable<StrictHttpResponse<Array<ProjectToReturnTotal>>> {
  const rb = new RequestBuilder(rootUrl, getAllProjectsByStudent.PATH, 'get');
  if (params) {
    rb.path('id', params.id, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<Array<ProjectToReturnTotal>>;
    })
  );
}

getAllProjectsByStudent.PATH = '/projects/student/{id}';
