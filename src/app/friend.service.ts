import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FriendService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // เพิ่มฟังก์ชันเพื่อรับ JWT Token จาก Local Storage
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('token'); // ดึง token จาก localStorage
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // ฟังก์ชันสำหรับส่งคำขอเป็นเพื่อน
  sendFriendRequest(requesterUserId: number, receiverUserId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.post(`${this.apiUrl}/request`, { requesterUserId, receiverUserId }, { headers });
  }

  // ฟังก์ชันสำหรับยอมรับคำขอเป็นเพื่อน
  acceptFriendRequest(requestId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/accept`, { requestId }, { headers });
  }

  // ฟังก์ชันสำหรับปฏิเสธคำขอเป็นเพื่อน
  declineFriendRequest(requestId: number): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.put(`${this.apiUrl}/decline`, { requestId }, { headers });
  }

  // เพิ่มฟังก์ชันสำหรับดึงคำขอเป็นเพื่อนที่รอการตอบรับ
  getPendingRequests(): Observable<any> {
    const headers = this.getAuthHeaders();
    return this.http.get(`${this.apiUrl}/requests/pending`, { headers });
  }
}