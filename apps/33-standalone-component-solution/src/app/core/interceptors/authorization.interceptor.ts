import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { People } from '../../shared/models/people.model';

/** @Injectable()
export class AuthorizationInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<People | Array<People>>, next: HttpHandler): Observable<HttpEvent<People | Array<People>>> {
    const clonedRequest = request.clone({ setHeaders: { Authorization: 'Sfeir' } });
    return next.handle(clonedRequest);
  }
} **/

export function AuthorizationInterceptor(
  request: HttpRequest<People | Array<People>>,
  next: HttpHandlerFn
): Observable<HttpEvent<People | Array<People>>> {
  const clonedRequest = request.clone({ setHeaders: { Authorization: 'Sfeir' } });
  return next(clonedRequest) as Observable<HttpEvent<People | Array<People>>>;
}
