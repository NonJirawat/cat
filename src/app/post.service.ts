import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  getPosts() {
    throw new Error('Method not implemented.');
  }
  private apiUrl = 'http://localhost:3000/api';  // URL ของ API backend

  constructor(private http: HttpClient) {}

  // ดึงโพสต์ทั้งหมด
  getAllPosts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/post`);
  }

  // ดึงโพสต์ของผู้ใช้ที่ล็อกอิน
  getUserPosts(): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get(`${this.apiUrl}/user/posts`, { headers });
  }

  // ดึงรายละเอียดโพสต์ตาม ID
  getPostById(postId: number): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get(`${this.apiUrl}/posts/${postId}`, { headers });
  }

  // สร้างโพสต์ใหม่
  createPost(content: string, image: string | null): Observable<any> {
    const userId = this.getUserIdFromToken();
    if (!userId) throw new Error('User is not logged in');

    return this.http.post(`${this.apiUrl}/post`, { userId, content, image });
  }

  // ดึง userId จาก token
  private getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.userId;
    }
    return null;
  }
  
  getPostUser(postId: number): Observable<any> {
  const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
  return this.http.get(`${this.apiUrl}/posts/${postId}`, { headers });
}
getPostsWithCats(): Observable<any> {
  return this.http.get(`${this.apiUrl}/posts-with-cats`);
}
}
