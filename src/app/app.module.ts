import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './register/register.component';
import { PostComponent } from './postcom/post.component';
import { PostUserComponent } from './post-user/post-user.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { FriendMatchingComponent } from './friend-matching/friend-matching.component';
import { RequestFriendComponent } from './request-friend/request-friend.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ResultComponent } from './result/result.component';
import { MatchingComponent } from './matching/matching.component';
import { InsertfromComponent } from './insertfrom/insertfrom.component';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    PostComponent,
    PostUserComponent,
    PostDetailComponent,
    FriendMatchingComponent,
    RequestFriendComponent,
    NavbarComponent,
    ResultComponent,
    MatchingComponent,
    InsertfromComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
