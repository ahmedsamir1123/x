import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './templetes/main-page/main-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { WriteReportComponent } from './write-report/write-report.component';
import { MyReportsComponent } from './my-reports/my-reports.component';
import { HomePageComponent } from './home-page/home-page.component';
import {HttpClientModule} from '@angular/common/http';
import { FeedBackComponent } from './feed-back/feed-back.component'
import {ReactiveFormsModule} from '@angular/forms';
import { EditReportComponent } from './edit-report/edit-report.component';
import { WriteMedicalReportComponent } from './write-medical-report/write-medical-report.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ClerkComponent } from './clerk/clerk.component';
import { AccountSettingComponent } from './account-setting/account-setting.component';


@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    LoginComponent,
    SignUpComponent,
    WriteReportComponent,
    MyReportsComponent,
    HomePageComponent,
    FeedBackComponent,
    EditReportComponent,
    WriteMedicalReportComponent,
    AdminPanelComponent,
    ClerkComponent,
    AccountSettingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AngularEditorModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
