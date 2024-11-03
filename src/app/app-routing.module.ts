import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './post/post.component';
import { authGuard } from './auth.guard';  // แก้ไขชื่อให้ถูกต้องเป็น AuthGuard
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostUserComponent } from './post-user/post-user.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },  // ป้องกันไม่ให้เข้าถึงหน้าโฮมถ้าไม่ได้ล็อกอิน
  { path: 'post/:id', component: PostDetailComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },  // หน้า login ไม่ต้องใช้ Guard
  { path: 'register', component: RegisterComponent },  // หน้า register ไม่ต้องใช้ Guard
  { path: 'post', component: PostComponent, canActivate: [authGuard] },  // หน้าโพสต์ ต้องล็อกอินก่อน
  { path: 'post-user', component: PostUserComponent, canActivate: [authGuard] },  // หน้าโพสต์ของผู้ใช้
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // กำหนดให้เส้นทางหลักเป็นหน้าโฮม
  { path: '**', redirectTo: '/home' }  // กำหนดเส้นทางผิดพลาดให้ไปหน้าโฮม
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
