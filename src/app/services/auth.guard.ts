import { Injectable } from '@angular/core';
import { CanActivate, CanLoad } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  canActivate(): boolean {
    return true;
  }

  canLoad(): boolean {
    return true;
  }

}
