import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './feature/home/home.component';
import { AddPersonDialogComponent } from './feature/people/components/add-person-dialog/add-person-dialog.component';
import { PeopleComponent } from './feature/people/people.component';
import { UpdatePersonComponent } from './feature/update-person/update-person.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  declarations: [AppComponent, HomeComponent, PeopleComponent, AddPersonDialogComponent, UpdatePersonComponent],
  bootstrap: [AppComponent],
  imports: [BrowserModule, BrowserAnimationsModule, AppRoutingModule, SharedModule],
  providers: [provideHttpClient(withInterceptorsFromDi())],
})
export class AppModule {}
