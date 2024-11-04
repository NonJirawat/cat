import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  combinedPosts: any[] = [];

  constructor(private postService: PostService, private router: Router) {}

  ngOnInit(): void {
    this.loadPosts();
  }

  loadPosts(): void {
    this.postService.getPostsWithCats().subscribe({
      next: (data) => {
        this.combinedPosts = data;
      },
      error: (err) => console.error('Error loading posts:', err)
    });
  }

  goToPostDetail(postId: number): void {
    this.router.navigate(['/post-detail', postId]);
  }

  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
  }
}
