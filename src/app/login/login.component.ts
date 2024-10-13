import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        localStorage.setItem('token', response.token); // เก็บ JWT token
        this.router.navigate(['/home']); // เปลี่ยนหน้าไปที่ home เมื่อ login สำเร็จ
      },
      error: (err) => {
        this.errorMessage = 'Login failed. Please check your email and password.';
      }
    });
  }
}
