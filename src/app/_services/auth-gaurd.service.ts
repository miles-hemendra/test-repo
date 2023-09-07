import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate {

  constructor(public tokenService: TokenService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const currRole = this.tokenService.getUser().role;
    if(currRole && currRole == expectedRole) {
      return true;
    }
    this.router.navigate(['']);
    return false;
  }

}
