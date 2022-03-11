import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HomeComponent } from './feature/home/home.component';
import { PeopleComponent } from './feature/people/people.component';
import { SharedModule } from './shared/shared.module';
import { AddPersonDialogComponent } from './feature/people/components/add-person-dialog/add-person-dialog.component';
import { UpdatePersonComponent } from './feature/update-person/update-person.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, PeopleComponent, AddPersonDialogComponent, UpdatePersonComponent],
  imports: [BrowserModule, BrowserAnimationsModule, CoreModule, AppRoutingModule, SharedModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
