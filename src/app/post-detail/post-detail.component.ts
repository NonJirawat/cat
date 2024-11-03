import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html'
})
export class PostDetailComponent implements OnInit {
  post: any;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    const postId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadPostDetail(postId);
  }

  loadPostDetail(postId: number): void {
    this.postService.getPostUser(postId).subscribe({
      next: (data: any) => {
        this.post = data;
      },
      error: (err: any) => {
        console.error('Error fetching post details:', err);
      }
    });
  }
}
