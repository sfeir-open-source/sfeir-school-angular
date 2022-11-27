import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './components/header/header.component';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';

@NgModule({
  imports: [SharedModule],
  declarations: [HeaderComponent],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }],
  exports: [HeaderComponent],
})
export class CoreModule {}
