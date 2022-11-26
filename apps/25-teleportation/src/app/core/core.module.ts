import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';

@NgModule({
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }],
})
export class CoreModule {}
