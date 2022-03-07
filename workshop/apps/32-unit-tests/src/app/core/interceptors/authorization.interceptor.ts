import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { People } from '../../shared/models/people.model';

@Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<People | Array<People>>, next: HttpHandler): Observable<HttpEvent<People | Array<People>>> {
    const clonedRequest = request.clone({ setHeaders: { Authorization: 'Sfeir' } });
    return next.handle(clonedRequest);
  }
}
