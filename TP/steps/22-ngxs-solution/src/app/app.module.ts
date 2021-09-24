import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { PeopleComponent } from './people';
import { CardComponent } from './shared/card';
import { AddDialogComponent } from './people/add-dialog/add-dialog.component';
import { FormComponent } from './shared/form';
import { UpdateComponent } from './update/update.component';
import { PeopleService } from './shared/people-service';
import { NaPipe } from './shared/na-pipe';
import { SfeirBadgeDirective } from './shared/badge';
import { AppState } from './app.state';
import { environment } from '../environments/environment';
import { SearchComponent } from './shared/search/search.component';
import { RouterModule, Routes } from '@angular/router';

const ROUTES: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'edit/:id', component: UpdateComponent },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatCheckboxModule,
    MatRadioModule,
    MatIconModule,
    MatListModule,
    MatDialogModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    ReactiveFormsModule,
    NgxsModule.forRoot([AppState]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot({
      disabled: environment.production
    })
  ],
  declarations: [
    AppComponent,
    HomeComponent,
    PeopleComponent,
    CardComponent,
    AddDialogComponent,
    FormComponent,
    UpdateComponent,
    NaPipe,
    SfeirBadgeDirective,
    SearchComponent
  ],
  entryComponents: [AddDialogComponent],
  providers: [PeopleService],
  bootstrap: [AppComponent]
})
export class AppModule {}
