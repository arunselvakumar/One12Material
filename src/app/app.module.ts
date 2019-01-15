import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './modules/app-routing.module';
import {AppComponent} from './app.component';

import {AppMaterialModule} from './modules/app-material.module';
import {BlogComponent} from './components/blog/blog.component';
import {ContributerComponent} from './components/contributers/contributer.component';
import {FeedbackComponent} from './components/feedback/feedback.component';
import {MainComponent} from './components/main/main.component';
import {SignupComponent} from './components/auth/signup/signup.component';
import {HeaderComponent} from './components/navigation/header/header.component';
import {SidenavListComponent} from './components/navigation/sidenav-list/sidenav-list.component';
import {AppFirebaseModule} from './modules/app-firebase.module';

import {AuthService} from './services/auth.service';
import {LoginComponent} from './components/auth/login/login.component';
import {SpeedDialComponent} from './components/shared/speed-dial/speed-dial.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    ContributerComponent,
    FeedbackComponent,
    MainComponent,
    SignupComponent,
    HeaderComponent,
    SidenavListComponent,
    LoginComponent,
    SpeedDialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    FlexLayoutModule,
    FormsModule,
    AppFirebaseModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
