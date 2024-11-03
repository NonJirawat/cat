import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.setToken(response.token);  // เก็บ token
        this.router.navigate(['/home']);  // ไปที่หน้า home หลังจากล็อกอินสำเร็จ
      },
      error: (err) => console.error('Login failed', err)
    });
  }
}
