import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { PeopleComponent } from './feature/people/people.component';
import { SharedModule } from './shared/shared.module';
import { AddPersonDialogComponent } from './feature/people/components/add-person-dialog/add-person-dialog.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, HomeComponent, PeopleComponent, AddPersonDialogComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, SharedModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
