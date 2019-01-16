import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {PostService} from '../../services/post/post.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit, OnDestroy {
  posts: any[] = [];

  private userAuthorizationSubscription: Subscription;

  constructor(private authService: AuthService, private router: Router, private postService: PostService) {
  }

  ngOnInit(): void {
    this.userAuthorizationSubscription = this.authService.user.subscribe(user => {
      if (!user) {
        this.router.navigate(['/login']);
      } else {
        this.postService.getAllPosts().subscribe(data => {
          this.posts = data.slice();
        });
      }
    });
  }

  ngOnDestroy(): void {
    if (this.userAuthorizationSubscription) {
      this.userAuthorizationSubscription.unsubscribe();
    }
  }
}
