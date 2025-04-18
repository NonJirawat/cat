import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';


@Component({
  selector: 'app-post-user',
  templateUrl: './post-user.component.html'  // เปลี่ยนชื่อไฟล์ HTML
})
export class PostUserComponent implements OnInit {
  userPosts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadPostUser();
  }

  loadPostUser(): void {
    this.postService.getUserPosts().subscribe({
      next: (data) => {
        this.userPosts = data;
      },
      error: (err) => {
        console.error('Error fetching user posts:', err);
      }
    });
  }
}
