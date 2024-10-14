import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private apiUrl = 'http://localhost:3000/api/posts';  // URL ของ API backend

  constructor(private http: HttpClient) {}

  // ฟังก์ชันสำหรับดึง userId จาก token
  getUserIdFromToken(): number | null {
    const token = localStorage.getItem('token');  // ดึง token จาก localStorage
    if (token) {
      const decodedToken: any = jwtDecode(token);  // ถอดรหัส token เพื่อดึงข้อมูล
      return decodedToken.userId;  // คืนค่า userId จาก payload ของ token
    }
    return null;
  }

  // ฟังก์ชันสำหรับสร้างโพสต์ใหม่
  createPost(content: string, image: string): Observable<any> {
    const userId = this.getUserIdFromToken();  // ดึง userId จาก token
    if (!userId) {
      throw new Error('User is not logged in');
    }

    return this.http.post(this.apiUrl, {
      userId: userId,
      content: content,
      image: image || null  // ถ้า image เป็นค่าว่าง ให้ส่ง null
    });
  }
}
