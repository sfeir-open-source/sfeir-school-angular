import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { SharedModule } from '../shared/shared.module';
import { AuthorizationInterceptor } from './interceptors/authorization.interceptor';
import { appReducer } from './store/reducer';

@NgModule({
  imports: [HttpClientModule, SharedModule, StoreModule.forRoot({ store: appReducer }), StoreDevtoolsModule.instrument({ maxAge: 25 })],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true }],
})
export class CoreModule {}
