import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { WINDOW } from '../provider/window';

export const TokenInterceptor: HttpInterceptorFn = (request, next) => {
  const sessionStorage = inject(WINDOW).sessionStorage;
  const token = sessionStorage.getItem('Authorization');
  const clonedRequest = request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });
  return next(clonedRequest);
};
