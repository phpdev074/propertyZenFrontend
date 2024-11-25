import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {
    window.scroll(0,0);

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      var mm:any =(state.url).split('/');
      const url = '/'+ mm[1];
      let loginStatus: boolean = false;
      if (localStorage.getItem('pza_login')) {
        loginStatus = true;
      } 
      if (url === '/'  || url === '/signin') {
        if (loginStatus) {
          this.router.navigate(['/dashboard']);
        }
      } else {
        if (!loginStatus) {
          this.router.navigate(['/signin']);
        }
      }
      window.scroll(0,0);
    return true;
  }

}
