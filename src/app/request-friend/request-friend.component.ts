import { Component, OnInit } from '@angular/core';
import { FriendService } from '../friend.service';

@Component({
  selector: 'app-request-friend',
  templateUrl: './request-friend.component.html',
  styleUrls: ['./request-friend.component.css']
})
export class RequestFriendComponent implements OnInit {
  pendingRequests: any[] = [];

  constructor(private friendService: FriendService) {}

  ngOnInit(): void {
    this.loadPendingRequests();
  }

  loadPendingRequests(): void {
    this.friendService.getPendingRequests().subscribe({
      next: (data: any) => this.pendingRequests = data,
      error: (err: any) => console.error('Error loading pending requests:', err)
    });
  }

  acceptRequest(requestId: number): void {
    this.friendService.acceptFriendRequest(requestId).subscribe({
      next: () => this.loadPendingRequests(),
      error: (err: any) => console.error('Error accepting request:', err)
    });
  }

  declineRequest(requestId: number): void {
    this.friendService.declineFriendRequest(requestId).subscribe({
      next: () => this.loadPendingRequests(),
      error: (err: any) => console.error('Error declining request:', err)
    });
  }
}
