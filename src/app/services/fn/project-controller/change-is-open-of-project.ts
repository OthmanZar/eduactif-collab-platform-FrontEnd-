/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface ChangeIsOpenOfProject$Params {
  name: string;
  isOpen: boolean;
}

export function changeIsOpenOfProject(http: HttpClient, rootUrl: string, params: ChangeIsOpenOfProject$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, changeIsOpenOfProject.PATH, 'patch');
  if (params) {
    rb.path('name', params.name, {});
    rb.query('isOpen', params.isOpen, {});
  }

  return http.request(
    rb.build({ responseType: 'json', accept: 'application/json', context })
  ).pipe(
    filter((r: any): r is HttpResponse<any> => r instanceof HttpResponse),
    map((r: HttpResponse<any>) => {
      return r as StrictHttpResponse<{
      }>;
    })
  );
}

changeIsOpenOfProject.PATH = '/project/{name}/opening';
