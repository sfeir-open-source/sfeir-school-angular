import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { HeaderComponent } from './components/header/header.component';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { AppStore } from './store/app.store';

@NgModule({
  imports: [NgxsModule.forRoot([AppStore], { selectorOptions: { suppressErrors: true } }), CommonModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class CoreModule {}
