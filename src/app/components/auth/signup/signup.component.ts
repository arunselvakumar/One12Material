import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from '@angular/forms';

import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit, OnDestroy {

  private userAuthorizationSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.userAuthorizationSubscription =  this.authService.user
      .subscribe(user => {

        if (user) {
          this.router.navigate(['/']);
        }
      });

  }

  ngOnDestroy(): void {
    if (this.userAuthorizationSubscription) {
      this.userAuthorizationSubscription.unsubscribe();
    }
  }

  onSubmit(form: NgForm) {

    const user = {
      id: null,
      email: form.value.email,
      password: form.value.password
    };

    this.authService.registerUser(user);

  }

}
