import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
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

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response: any) => {  // กำหนดประเภท response เป็น any
        this.authService.setToken(response.token);  // เก็บ token
        this.router.navigate(['/home']);  // นำไปที่หน้า home หลังจากลงทะเบียนสำเร็จ
      },
      error: (error: any) => {  // กำหนดประเภท error เป็น any
        console.error('Registration failed', error);
      }
    });
  }
}
