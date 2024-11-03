import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-request-friend',
  templateUrl: './request-friend.component.html'
})
export class RequestFriendComponent implements OnInit {
  friendRequests: any[] = [];

  constructor(private friendService: FriendService) {}

  ngOnInit(): void {
    this.loadFriendRequests();
  }

  loadFriendRequests(): void {
    // เรียก API เพื่อดึงข้อมูลคำขอเป็นเพื่อนที่รอการตอบกลับ
  }

  sendFriendRequest(receiverUserId: number): void {
    this.friendService.sendFriendRequest(1, receiverUserId).subscribe({
      next: () => alert('Friend request sent'),
      error: (err) => console.error('Error sending friend request', err)
    });
  }

  acceptFriendRequest(requestId: number): void {
    this.friendService.acceptFriendRequest(requestId).subscribe({
      next: () => alert('Friend request accepted'),
      error: (err) => console.error('Error accepting friend request', err)
    });
  }

  declineFriendRequest(requestId: number): void {
    this.friendService.declineFriendRequest(requestId).subscribe({
      next: () => alert('Friend request declined'),
      error: (err) => console.error('Error declining friend request', err)
    });
  }
}
