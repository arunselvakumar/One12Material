import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from '../components/main/main.component';
import { BlogComponent } from '../components/blog/blog.component';
import { ContributerComponent } from '../components/contributers/contributer.component';
import { FeedbackComponent } from '../components/feedback/feedback.component';
import { SignupComponent } from '../components/auth/signup/signup.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'contributers', component: ContributerComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'signup', component: SignupComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
