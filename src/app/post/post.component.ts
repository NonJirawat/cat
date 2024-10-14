import { Component } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  content: string = '';
  image: string = '';
  errorMessage: string = '';  // เก็บข้อความแสดงข้อผิดพลาด

  constructor(private postService: PostService) {}

  // ฟังก์ชันสำหรับการสร้างโพสต์ใหม่
  createPost(): void {
    this.postService.createPost(this.content, this.image).subscribe({
      next: (response) => {
        console.log('Post created successfully:', response);
        this.content = '';  // ล้างเนื้อหาหลังจากโพสต์สำเร็จ
        this.image = '';    // ล้าง URL รูปภาพ
      },
      error: (error) => {
        this.errorMessage = 'Error creating post';
        console.error('Error creating post:', error);
      }
    });
  }
}
