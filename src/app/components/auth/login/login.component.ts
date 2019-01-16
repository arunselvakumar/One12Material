import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../../services/auth/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  private userAuthorizationSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

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

    this.authService.signInUser(user);

  }

}
