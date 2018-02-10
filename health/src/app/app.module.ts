import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { ReactiveFormsModule,} from '@angular/forms';
import { NgCalendarModule  } from 'ionic2-calendar';
import { CommonModule } from '@angular/common';  
import { EmailComposer } from '@ionic-native/email-composer';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { NewclientPage } from '../pages/newclient/newclient';
import { SigninPage } from '../pages/signin/signin';
import { SearchPage } from '../pages/search/search';
import {DoctorsPage} from '../pages/doctors/doctors';
import {ConnectedPage} from '../pages/connected/connected';
import {CalendarPage} from '../pages/calendar/calendar';
import { SendemailPage } from '../pages/sendemail/sendemail';
import { WelcomePage } from '../pages/welcome/welcome';
import { DisponibilityPage } from '../pages/disponibility/disponibility';
import { SerachunloggedPage } from'../pages/serachunlogged/serachunlogged';
import { SearchloggedPage } from'../pages/searchlogged/searchlogged';




import {HttpModule} from '@angular/http';

import { GetdoctorsProvider } from '../providers/getdoctors/getdoctors';
import { ShareProvider } from '../providers/share/share';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NewclientPage,
    SigninPage,
    SearchPage,
    DoctorsPage,
    ConnectedPage,
    CalendarPage,
    SendemailPage,
    WelcomePage,
    DisponibilityPage,
    SerachunloggedPage,
    SearchloggedPage
    


  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
    ReactiveFormsModule,
    NgCalendarModule,
    CommonModule,
    

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NewclientPage,
    SigninPage,
    SearchPage,
    DoctorsPage,
    ConnectedPage,
    CalendarPage,
    SendemailPage,
    WelcomePage,
    DisponibilityPage,
    SerachunloggedPage,
    SearchloggedPage
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    EmailComposer,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    GetdoctorsProvider,
    ShareProvider
  ]
})
export class AppModule {}
