import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const BASE_URL = 'http://localhost:9000';

@Injectable({
  providedIn: 'root'
})
export class UserResolverService implements Resolve<any> {
  constructor(private _http: HttpClient) {}

  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this._http.get(`${BASE_URL}/api/peoples/`);
  }
}
