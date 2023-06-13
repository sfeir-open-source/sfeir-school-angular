import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  imports: [CommonModule],
  exports: [HeaderComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }],
  declarations: [HeaderComponent],
})
export class CoreModule {}
