import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { HeaderComponent } from './components/header/header.component';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule],
  declarations: [HeaderComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }],
  exports: [HeaderComponent],
})
export class CoreModule {}
