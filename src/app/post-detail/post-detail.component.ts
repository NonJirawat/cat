import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../post.service';
import { FriendService } from '../friend.service'; // เพิ่ม FriendService ตรงนี้

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {
  combinedData: any;
  postId: number | null = null;
 combinedPost: any = {};
  
 constructor(
  private route: ActivatedRoute,
  private postService: PostService,
  private friendService: FriendService // เพิ่ม friendService ตรงนี้
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
  addFriend(): void {
    const requesterUserId = 1; // แทนที่ 1 ด้วย ID ของผู้ใช้ที่ล็อกอินจริงๆ
    const receiverUserId = this.combinedData?.IDUser;
  
    if (receiverUserId) {
      this.friendService.sendFriendRequest(requesterUserId, receiverUserId).subscribe({
        next: () => alert('Friend request sent successfully'),
        error: (err: any) => console.error('Error sending friend request:', err)
      });
    }
  }
  
}