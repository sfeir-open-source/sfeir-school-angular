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

<<<<<<< HEAD:TP/steps/router-lazyloading-guard-solution/src/app/resolver/user-resolver.service.ts
  resolve(_route: ActivatedRouteSnapshot, _state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
=======
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
>>>>>>> (feature) Sort TP folders according to slides:TP/steps/25-router-lazyloading-guard-solution/src/app/resolver/user-resolver.service.ts
    return this._http.get(`${BASE_URL}/api/peoples/`);
  }
}
