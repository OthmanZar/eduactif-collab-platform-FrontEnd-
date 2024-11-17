import { ResolveFn } from '@angular/router';
import {ProjectToReturn} from "../models/ProjectToReturn";
import {ProjectControllerService} from "../services/project-controller.service";
import {inject} from "@angular/core";
import {delay, Observable} from "rxjs";

export const projectsResolverResolver: ResolveFn<Observable<ProjectToReturn[]>> = (
  route,
  state,
  projectService :ProjectControllerService = inject(ProjectControllerService)
  ) => {
  return  projectService.getAllProjects().pipe(

      );



};
