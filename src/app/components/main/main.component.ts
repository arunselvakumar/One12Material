import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  private userAuthorizationSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.userAuthorizationSubscription = this.authService.user.subscribe(user => {
      if (!user) {

        this.router
          .navigate(['/login'])
          .finally(() => this.userAuthorizationSubscription.unsubscribe());
      }
    });
  }

}
