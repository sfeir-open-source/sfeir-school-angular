import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { PeopleComponent } from './people';
import { AddDialogComponent } from './people/add-dialog/add-dialog.component';
import { SfeirBadgeDirective } from './shared/badge';
import { CardComponent } from './shared/card';
import { NaPipe } from './shared/na-pipe';
import { PeopleService } from './shared/people-service';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', component: PeopleComponent }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatIconModule,
    MatCheckboxModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES)
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PeopleComponent,
    CardComponent,
    AddDialogComponent,
    NaPipe,
    SfeirBadgeDirective
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
