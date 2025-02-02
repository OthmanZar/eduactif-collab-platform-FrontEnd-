/* tslint:disable */
/* eslint-disable */
/* Code generated by ng-openapi-gen DO NOT EDIT. */

import { HttpClient, HttpContext, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { StrictHttpResponse } from '../../strict-http-response';
import { RequestBuilder } from '../../request-builder';


export interface GetAllProjectsByDomaine$Params {
  domaine: 'Web' | 'CyberSecurity' | 'Ai_Models';
}

export function getAllProjectsByDomaine(http: HttpClient, rootUrl: string, params: GetAllProjectsByDomaine$Params, context?: HttpContext): Observable<StrictHttpResponse<{
}>> {
  const rb = new RequestBuilder(rootUrl, getAllProjectsByDomaine.PATH, 'get');
  if (params) {
    rb.path('domaine', params.domaine, {});
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

getAllProjectsByDomaine.PATH = '/projects/domaine/{domaine}';
