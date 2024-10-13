import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    // ตรวจสอบว่ารหัสผ่านและยืนยันรหัสผ่านตรงกัน
    if (this.password !== this.confirmPassword) {
      this.errorMessage = 'Passwords do not match';
      return;
    }

    // เรียกใช้ AuthService เพื่อลงทะเบียนผู้ใช้ใหม่
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token); // เก็บ JWT token
        this.router.navigate(['/home']); // หลังจากลงทะเบียนสำเร็จ
      },
      error: (err) => {
        this.errorMessage = 'Registration failed. Please try again.';
      }
    });
  }
}
