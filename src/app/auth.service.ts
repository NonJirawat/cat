import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';  // URL ของ API backend

  constructor(private http: HttpClient, private router: Router) {}

  // ฟังก์ชัน login
  login(email: string, password: string): Observable<any> {
    const loginData = { email, password };
    return this.http.post(`${this.apiUrl}/login`, loginData);
  }

  register(name: string, email: string, password: string): Observable<any> {
    const registerData = { name, email, password };
    return this.http.post(`${this.apiUrl}/register`, registerData);
  }

  // ฟังก์ชันเพื่อตรวจสอบการเข้าสู่ระบบ
  isLoggedIn(): boolean {
    // ตรวจสอบว่าทำงานใน environment ของเบราว์เซอร์หรือไม่
    return typeof window !== 'undefined' && !!localStorage.getItem('token');
  }

  // ฟังก์ชันเพื่อล็อกเอาท์
  logout() {
    localStorage.removeItem('token');  // ลบ token ออกจาก localStorage
    this.router.navigate(['/login']);  // นำทางไปที่หน้า login
  }

  // ฟังก์ชันเพื่อเก็บ token ใน localStorage
  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  // ฟังก์ชันเพื่อดึง token จาก localStorage
  getToken(): string | null {
    return localStorage.getItem('token');
  }
  
}
