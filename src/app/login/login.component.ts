import { Component } from '@angular/core';
import { AuthService } from '../auth.service';  // นำเข้า AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';  // เก็บข้อความแสดงข้อผิดพลาด

  constructor(private authService: AuthService, private router: Router) {}

  // ฟังก์ชัน login เมื่อผู้ใช้กดปุ่มล็อกอิน
  onLogin() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);  // เก็บ token ที่ได้รับใน localStorage
        this.router.navigate(['/home']);  // หลังจากล็อกอินสำเร็จ นำทางไปที่หน้า home
      },
      error: (error) => {
        this.errorMessage = 'Invalid email or password';  // แสดงข้อความข้อผิดพลาดหากล็อกอินไม่สำเร็จ
      }
    });
  }
}
