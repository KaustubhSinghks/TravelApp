import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

import { AdminGuard } from './admin.guard';
import { AuthService } from '../../features/auth/services/auth.service';

describe('AdminGuard', () => {
  let guard: AdminGuard;
  let authService: jasmine.SpyObj<AuthService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(() => {
    // Create a mock AuthService and Router
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['isLoggedIn', 'getRole']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AdminGuard,
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy },
      ],
    });

    guard = TestBed.inject(AdminGuard);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should allow activation if user is logged in and is an ADMIN', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getRole.and.returnValue('ADMIN');

    const canActivate = guard.canActivate();
    expect(canActivate).toBe(true);
  });

  it('should not allow activation if user is not an ADMIN', () => {
    authService.isLoggedIn.and.returnValue(true);
    authService.getRole.and.returnValue('USER');

    const canActivate = guard.canActivate();
    expect(canActivate).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/user/profile']);
  });

  it('should not allow activation if user is not logged in', () => {
    authService.isLoggedIn.and.returnValue(false);
    
    const canActivate = guard.canActivate();
    expect(canActivate).toBe(false);
    expect(router.navigate).toHaveBeenCalledWith(['/user/profile']);
  });
});