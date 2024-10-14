import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';  // นำเข้า AuthService
import { authGuard } from './auth.guard';  // นำเข้า AuthGuard

describe('authGuard', () => {
  let guard: authGuard;  // สร้างตัวแปร guard
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        authGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }
      ]
    });

    guard = TestBed.inject(authGuard);  // สร้างอินสแตนซ์ของ guard
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow activation if user is logged in', () => {
    authService.isLoggedIn.and.returnValue(true);  // จำลองว่าผู้ใช้ล็อกอินอยู่

    expect(guard.canActivate()).toBe(true);  // ทดสอบให้ canActivate() คืนค่าเป็น true
  });

  it('should navigate to login if user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);  // จำลองว่าผู้ใช้ยังไม่ล็อกอิน

    expect(guard.canActivate()).toBe(false);  // ทดสอบให้ canActivate() คืนค่าเป็น false
    expect(router.navigate).toHaveBeenCalledWith(['/login']);  // ทดสอบให้มีการเรียก router.navigate ไปที่หน้า login
  });
});
