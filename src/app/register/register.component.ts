import { Component } from '@angular/core';
import { AuthService } from '../auth.service';  // นำเข้า AuthService
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string = '';
  email: string = '';
  password: string = '';
  errorMessage: string = '';  // เก็บข้อความแสดงข้อผิดพลาด

  constructor(private authService: AuthService, private router: Router) {}

  // ฟังก์ชัน register เมื่อผู้ใช้กดปุ่มลงทะเบียน
  onRegister() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);  // เก็บ token ที่ได้รับใน localStorage
        this.router.navigate(['/home']);  // หลังจากลงทะเบียนสำเร็จ นำทางไปที่หน้า home
      },
      error: (error) => {
        this.errorMessage = 'Registration failed';  // แสดงข้อความข้อผิดพลาดหากการลงทะเบียนล้มเหลว
      }
    });
  }
}
