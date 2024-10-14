import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // นำเข้า HttpClient สำหรับทำงานกับ HTTP
import { Observable } from 'rxjs';  // นำเข้า Observable เพื่อจัดการการทำงานแบบ async
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';  // URL ของ API (เปลี่ยนตามการตั้งค่าเซิร์ฟเวอร์)

  constructor(private http: HttpClient, private router: Router) { }

  // ฟังก์ชัน login
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };  // เตรียมข้อมูลสำหรับการ login
    return this.http.post(`${this.apiUrl}/login`, loginData);  // ส่งคำขอ POST ไปที่ API /login
  }
  register(name: string, email: string, password: string): Observable<any> {
    const registerData = { name, email, password };  // เตรียมข้อมูลสำหรับการลงทะเบียน
    return this.http.post(`${this.apiUrl}/register`, registerData);  // ส่งคำขอ POST ไปที่ API /register
  }

  // ฟังก์ชันเพื่อตรวจสอบว่าผู้ใช้ล็อกอินหรือยัง (โดยดูจากการมี token หรือไม่)
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');  // คืนค่า true ถ้ามี token อยู่ใน localStorage
  }

  // ฟังก์ชันเพื่อล็อกเอาท์
  logout() {
    localStorage.removeItem('token');  // ลบ token ออกจาก localStorage
    this.router.navigate(['/login']);  // นำทางผู้ใช้ไปที่หน้า login
  }

  // ฟังก์ชันเพื่อเก็บ token ใน localStorage
  setToken(token: string) {
    localStorage.setItem('token', token);  // เก็บ token ไว้ใน localStorage
  }

  // ฟังก์ชันเพื่อดึงข้อมูล token จาก localStorage
  getToken(): string | null {
    return localStorage.getItem('token');  // คืนค่า token ถ้ามีใน localStorage
  }
}
