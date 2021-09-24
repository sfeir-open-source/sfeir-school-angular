import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { PeopleComponent } from './people';
import { CardComponent } from './shared/card';
import { NaPipe } from './shared/na-pipe';
import { PeopleService } from './shared/people-service';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', component: PeopleComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    RouterModule.forRoot(ROUTES),
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [AppComponent, HomeComponent, PeopleComponent, CardComponent, NaPipe],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
