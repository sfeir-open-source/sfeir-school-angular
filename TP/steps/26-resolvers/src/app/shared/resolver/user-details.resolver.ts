import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserDetailsResolver implements Resolve<object> {
  constructor() {}

  resolve(): Observable<object> {
    return;
  }
}
