import { Injectable } from '@angular/core';
import { CanLoad } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccessSecretGuard implements CanLoad {
  canLoad(): boolean | Observable<boolean> | Promise<boolean> {
    // TODO
    return false;
  }
}
