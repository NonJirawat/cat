import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './post/post.component';
import { authGuard } from './auth.guard';  // แก้ไขชื่อให้ถูกต้องเป็น AuthGuard

const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },  // ป้องกันไม่ให้เข้าถึงถ้าไม่ล็อกอิน
  { path: 'post', component: PostComponent, canActivate: [authGuard] },  // หน้าโพสต์
  { path: 'login', component: LoginComponent },  // หน้า login ไม่ต้องใช้ Guard
  { path: 'register', component: RegisterComponent },  // หน้า register ไม่ต้องใช้ Guard
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
