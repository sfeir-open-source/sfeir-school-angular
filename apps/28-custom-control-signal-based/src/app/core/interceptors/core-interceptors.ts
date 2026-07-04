import type { HttpInterceptorFn } from '@angular/common/http';

export const TokenInterceptor: HttpInterceptorFn = (request, next) => {
  const clonedRequest = request.clone({
    setHeaders: {
      Authorization: 'Bearer SFEIR',
    },
  });

  return next(clonedRequest);
};
