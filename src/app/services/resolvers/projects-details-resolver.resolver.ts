import { ResolveFn } from '@angular/router';
import {Observable} from "rxjs";

import {ProjectToReturnTotal} from "../models/ProjectToReturnTotal";
import {ProjectControllerService} from "../services/project-controller.service";
import {inject} from "@angular/core";

export const projectsDetailsResolverResolver: ResolveFn<Observable<ProjectToReturnTotal>> =
  (route,
   state,
   projectService :ProjectControllerService = inject(ProjectControllerService)) => {
    let name:string= route.params['project'];
    return  projectService.getAllInformations({name}).pipe(

    );



};
