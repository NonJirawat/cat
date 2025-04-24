import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './postcom/post.component';
import { authGuard } from './auth.guard';  // แก้ไขเป็น AuthGuard
import { PostDetailComponent } from './post-detail/post-detail.component';
import { PostUserComponent } from './post-user/post-user.component';
import { RequestFriendComponent } from './request-friend/request-friend.component';
import { ResultComponent } from './result/result.component';
import { MatchingComponent } from './matching/matching.component';
import { InsertfromComponent } from './insertfrom/insertfrom.component';



const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },  // ป้องกันไม่ให้เข้าถึงหน้าโฮมถ้าไม่ได้ล็อกอิน
  { path: 'post/:id', component: PostDetailComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },  // หน้า login ไม่ต้องใช้ Guard
  { path: 'register', component: RegisterComponent },  // หน้า register ไม่ต้องใช้ Guard
  { path: 'post', component: PostComponent, canActivate: [authGuard] },  // หน้าโพสต์ ต้องล็อกอินก่อน
   { path: 'post-detail/:id', component: PostDetailComponent },  // เพิ่ม Guard สำหรับ post-detail
  { path: 'request-friend', component: RequestFriendComponent, canActivate: [authGuard] },  // ใช้ Guard สำหรับ request friend{ path: 'post-user', component: PostUserComponent, canActivate: [authGuard] },  // หน้าโพสต์ของผู้ใช้
  { path: 'post-user', component: PostUserComponent, canActivate: [authGuard] },  // หน้าโพสต์ของผู้ใช้
  { path: 'result', component: ResultComponent, canActivate: [authGuard] },  // หน้าผลลัพธ์
  { path: 'matching', component: MatchingComponent, canActivate: [authGuard] },  // หน้า matching
  { path: 'insert', component: InsertfromComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },  // กำหนดให้เส้นทางหลักเป็นหน้าโฮม
  { path: '**', redirectTo: '/home' },  // กำหนดเส้นทางผิดพลาดให้ไปหน้าโฮม
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
