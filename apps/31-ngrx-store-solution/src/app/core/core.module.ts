import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HeaderComponent } from './components/header/header.component';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { appReducer } from './store/reducer';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [CommonModule, StoreModule.forRoot({ store: appReducer }), StoreDevtoolsModule.instrument({ maxAge: 25 })],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }],
  declarations: [HeaderComponent],
  exports: [HeaderComponent],
})
export class CoreModule {}
