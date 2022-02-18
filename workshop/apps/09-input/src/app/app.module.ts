import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { MaterialDesignModule } from './material-design.module';
import { PeopleComponent } from './feature/people/people.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PeopleComponent],
  imports: [BrowserModule, BrowserAnimationsModule, MaterialDesignModule, HttpClientModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
