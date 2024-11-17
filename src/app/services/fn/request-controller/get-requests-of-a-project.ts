/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';
import {RequestToReturn} from "../../models/request-to-return";


export interface GetRequestsOfAProject$Params {
  name: string;
}

export function getRequestsOfAProject(http: HttpClient, rootUrl: string, params: GetRequestsOfAProject$Params, context?: HttpContext): Observable<StrictHttpResponse<RequestToReturn[]>> {
  const rb = new RequestBuilder(rootUrl, getRequestsOfAProject.PATH, 'get');
  if (params) {
    rb.path('name', params.name, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<RequestToReturn[]>;
    })
  );
}

getRequestsOfAProject.PATH = '/requests/project/{name}';
