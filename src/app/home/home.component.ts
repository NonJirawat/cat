import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.loadAllPosts();
  }

  loadAllPosts(): void {
    this.postService.getAllPosts().subscribe({
      next: (data) => {
        this.posts = data;
      },
      error: (err) => {
        console.error('Error fetching posts:', err);
      }
    });
  }
}
