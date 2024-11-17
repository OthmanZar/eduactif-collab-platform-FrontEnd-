import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './views/landing/landing.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {HeaderComponent} from "./components/header/header.component";
import { MainComponent } from './components/main/main.component';
import { AboutComponent } from './components/about/about.component';
import { LoginComponent } from './components/login/login.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeatureCardComponent } from './components/feature-card/feature-card.component';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { RegisterComponent } from './views/register/register.component';
import { Step1Component } from './components/register/step1/step1.component';
import { Step2Component } from './components/register/step2/step2.component';
import { Step3Component } from './components/register/step3/step3.component';
import { ActivationAccountComponent } from './components/activation-account/activation-account.component';
import {CodeInputModule} from "angular-code-input";
import { DashboardComponent } from './views/dashboard/dashboard.component';
import {JwtInterceptorService} from "./services/security/token/jwt-interceptor.service";
import { ProjectComponent } from './components/project/project.component';

import { InformationComponent } from './components/information/information.component';
import {ProfileComponent} from "./components/profile/profile.component";
import { NotesComponent } from './components/notes/notes.component';
import { SideBarComponent } from './components/side-bar/side-bar.component';
import { EditProjectsComponent } from './components/edit-projects/edit-projects.component';
import { ReviewComponent } from './components/review/review.component';
import { ProjectDetailsComponent } from './components/project-details/project-details.component';
import { ModalFormComponent } from './components/modal-form/modal-form.component';
import { CreateProjectComponent } from './components/create-project/create-project.component';
import { EditPageComponent } from './components/edit-projects/edit-page/edit-page.component';
import { RequestsComponent } from './components/requests/requests.component';
import { StrangerProfileComponent } from './components/profile/stranger-profile/stranger-profile.component';
import { AddNotesComponent } from './components/add-notes/add-notes.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    MainComponent,
    AboutComponent,
    LoginComponent,
    FooterComponent,
    FeatureCardComponent,
    RegisterComponent,
    Step1Component,
    Step2Component,
    Step3Component,
    ActivationAccountComponent,
    DashboardComponent,
    ProjectComponent,
    ProfileComponent,
    InformationComponent,
    NotesComponent,
    SideBarComponent,
    EditProjectsComponent,
    ReviewComponent,
    ProjectDetailsComponent,
    ModalFormComponent,
    CreateProjectComponent,
    EditPageComponent,
    RequestsComponent,
    StrangerProfileComponent,
    AddNotesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    CodeInputModule

  ],
  providers: [HttpClient,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
