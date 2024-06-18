import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [CoreModule, BrowserModule, BrowserAnimationsModule, AppRoutingModule, MatToolbarModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
