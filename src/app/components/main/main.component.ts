import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {Router} from '@angular/router';
import {PostService} from '../../services/post/post.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  posts: any[] = [];

  constructor(private authService: AuthService, private router: Router, private postService: PostService) {
  }

  ngOnInit(): void {
    const currentUser = this.authService.getCurrentUser();

    if (currentUser) {
      this.postService.getAllPosts().subscribe(data => {
        this.posts = data.slice();
      });
    } else {
      this.router.navigate(['/login']);
    }
  }

  onLikeSelected(postId: string) {
    this.postService.likePost(postId);
  }
}
