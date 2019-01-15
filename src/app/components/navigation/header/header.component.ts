import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {AuthService} from '../../../services/auth.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sideNavToggle = new EventEmitter<void>();

  userAuthorizationSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.userAuthorizationSubscription = this.authService.user.subscribe(user => {
      if (user) {
        this.userAuthorizationSubscription.unsubscribe();
      }
    });
  }

  onToggleSideNav() {
    this.sideNavToggle.emit();
  }

  onLogOutClicked() {
    this.authService.logOutUser();
    this.router.navigate(['/login']);
  }

}
