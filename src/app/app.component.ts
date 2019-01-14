import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  private userAuthorizationSubscription: Subscription;

  title = 'One12Material';


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {

    this.userAuthorizationSubscription =  this.authService.user
      .subscribe(user => {

        if (!user) {
          this.router.navigate(['/login']);
        } else {
          this.userAuthorizationSubscription.unsubscribe();
        }

      });
  }

}
