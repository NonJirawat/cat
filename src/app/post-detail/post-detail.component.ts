import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  combinedData: any;
  postId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    // รับค่า postId จาก URL
    this.postId = Number(this.route.snapshot.paramMap.get('id'));
    this.getCombinedData();
  }

  getCombinedData(): void {
    this.postService.getCombinedData().subscribe({
      next: (data) => {
        // กรองข้อมูลให้เหลือเฉพาะโพสต์ที่ตรงกับ postId
        this.combinedData = data.find((item: any) => item.PostID === this.postId);
      },
      error: (err) => {
        console.error('Error fetching combined data:', err);
      }
    });
  }
}
