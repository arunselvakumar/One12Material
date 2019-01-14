import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private userAuthorizationSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

    this.userAuthorizationSubscription =  this.authService.user
      .subscribe(user => {

        if (user) {
          this.router.navigate(['/']);
          this.userAuthorizationSubscription.unsubscribe();
        }
      });

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
