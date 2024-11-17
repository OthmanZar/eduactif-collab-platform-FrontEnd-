import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./components/login/login.component";
import {LandingComponent} from "./views/landing/landing.component";
import {RegisterComponent} from "./views/register/register.component";
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {AuthGuardService} from "./services/security/auth-guard.service";

import {ProjectComponent} from "./components/project/project.component";
import {projectsResolverResolver} from "./services/resolvers/projects-resolver.resolver";
import {InformationComponent} from "./components/information/information.component";
import {NotesComponent} from "./components/notes/notes.component";
import {EditProjectsComponent} from "./components/edit-projects/edit-projects.component";
import {ReviewComponent} from "./components/review/review.component";
import {ProjectDetailsComponent} from "./components/project-details/project-details.component";
import {projectsDetailsResolverResolver} from "./services/resolvers/projects-details-resolver.resolver";
import {ProfileComponent} from "./components/profile/profile.component";
import {CreateProjectComponent} from "./components/create-project/create-project.component";
import {EditPageComponent} from "./components/edit-projects/edit-page/edit-page.component";
import {RequestsComponent} from "./components/requests/requests.component";
import {StrangerProfileComponent} from "./components/profile/stranger-profile/stranger-profile.component";
import {AddNotesComponent} from "./components/add-notes/add-notes.component";

const routes: Routes = [
  {
    path:"login",
    component:LoginComponent
  },

  {
    path:'home',
    component:LandingComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'dashboard',
    component:DashboardComponent,
    canActivate:[AuthGuardService],
    children:[
      {
        path:'profile/:userType/:email',
        component:ProfileComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'editProject/pro/:project',
        component:EditPageComponent,
        resolve:{details:projectsDetailsResolverResolver},
        canActivate:[AuthGuardService]
      },

      {
        path:'createProject/:type/:id',
        component:CreateProjectComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'information/:email',
        component:InformationComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'notes/:email',
        component:InformationComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'add-notes/:id',
        component:AddNotesComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'notes/:email/:schoolName/:type/:date',
        component:NotesComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'projects/:userType/:email',
        component:EditProjectsComponent,
        canActivate:[AuthGuardService],
      },
      {
        path:'projects/:userType/reviews/:project',
        component:ReviewComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'projects/:userType/requests/:project',
        component:RequestsComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'project/details/:project',
        component:ProjectDetailsComponent,
        resolve:{details:projectsDetailsResolverResolver},
        canActivate:[AuthGuardService]
      },
      {
        path:'user/:userType/:userId',
        component:StrangerProfileComponent,
        canActivate:[AuthGuardService]
      },
      {
        path:'general',
        component:ProjectComponent,
        resolve:{projects:projectsResolverResolver},
        canActivate:[AuthGuardService]
      },
    ]
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


