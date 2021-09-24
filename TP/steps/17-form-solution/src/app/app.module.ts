import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { PeopleComponent } from './people';
import { CardComponent } from './shared/card';
import { AddDialogComponent } from './people/add-dialog/add-dialog.component';
import { FormComponent } from './shared/form';
import { NaPipe } from './shared/na-pipe';
import { SfeirBadgeDirective } from './shared/badge';
import { PeopleService } from './shared/people-service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
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
    MatCheckboxModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PeopleComponent,
    CardComponent,
    AddDialogComponent,
    NaPipe,
    SfeirBadgeDirective,
    FormComponent
  ],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
