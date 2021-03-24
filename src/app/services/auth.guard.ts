import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { ApiAuthService } from './api-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private apiAuth: ApiAuthService,
    private router: Router
  ) {

  }

  canActivate(): boolean {
    const issetUser = this.apiAuth.getUser();

    if (issetUser){

      return true;
    }else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

  canLoad(): boolean {
    const issetUser = this.apiAuth.getUser();

    if (issetUser){

      return true;
    }else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
