import { WriteMedicalReportComponent } from './write-medical-report/write-medical-report.component';
import { EditReportComponent } from './edit-report/edit-report.component';
import { FeedBackComponent } from './feed-back/feed-back.component';
import { HomePageComponent } from './home-page/home-page.component';
import {ReactiveFormsModule} from '@angular/forms';

import { MyReportsComponent } from './my-reports/my-reports.component';
import { WriteReportComponent } from './write-report/write-report.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MainPageComponent } from './templetes/main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pathToFileURL } from 'url';
import { NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ClerkComponent } from './clerk/clerk.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';
const routes: Routes = [
  {path: "login" , component: LoginComponent},
  {path: "templates" , component: MainPageComponent},
  {path:"signup" , component: SignUpComponent},
  {path:"write report" , component: WriteReportComponent},
  {path:"write report/:id" , component: WriteReportComponent},

  {path: "My Reports" , component: MyReportsComponent},
 {path: "homepage" , component: HomePageComponent},
 {path: "feedback" , component : FeedBackComponent},
 {path: "editReport/:id" , component:EditReportComponent},
 {path: "medicalReport" , component:WriteMedicalReportComponent},
 {path : "" , component:HomePageComponent} ,
 {path: "admin" , component: AdminPanelComponent},
 {path: "clerk" , component: ClerkComponent},
 {path: "setting" , component: AccountSettingComponent},

 


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
