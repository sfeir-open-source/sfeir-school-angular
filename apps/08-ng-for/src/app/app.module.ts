import { NgOptimizedImage } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { MaterialDesignModule } from './material-design.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialDesignModule, AppRoutingModule, NgOptimizedImage],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
