import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AccessSecretGuard implements CanLoad {
  canLoad(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> | Promise<boolean> {
    if (window.location.hash.includes('who=me')) {
      return true;
    } else {
      return false;
    }
  }
}
