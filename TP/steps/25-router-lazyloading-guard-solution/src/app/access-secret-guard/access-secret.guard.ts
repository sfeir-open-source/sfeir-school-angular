import { Injectable } from '@angular/core';
import { CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccessSecretGuard implements CanLoad {
  constructor(private readonly router: Router) {}
  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    const isAuthorized = window.location.hash.includes('who=me');
    return isAuthorized ? true : this.router.navigate(['home']);
  }
}
