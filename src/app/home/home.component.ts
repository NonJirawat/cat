import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  combinedPosts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit(): void {
    this.postService.getPostsWithCats().subscribe({
      next: (data) => {
        this.combinedPosts = data;
      },
      error: (err) => console.error('Error fetching posts with cats:', err)
    });
  }
  truncateText(text: string, maxLength: number): string {
    return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

}
