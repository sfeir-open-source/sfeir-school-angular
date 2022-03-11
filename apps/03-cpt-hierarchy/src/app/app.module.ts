import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { MaterialDesignModule } from './material-design.module';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialDesignModule],
  providers: [],
  bootstrap: [HomeComponent],
})
export class AppModule {}
