import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
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
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './home';
import { PeopleComponent } from './people';
import { AddDialogComponent } from './people/add-dialog/add-dialog.component';
import { CardComponent, FormComponent, NaPipe, PeopleService, SearchComponent, SfeirBadgeDirective } from './shared';
import { AuthorizationInterceptor } from './shared/interceptors';
import { CachableInterceptor } from './shared/interceptors/cachable.interceptor';
import { metaReducers } from './store/meta-reducers';
import * as fromPeopleReducer from './store/reducers/people.reducer';
import { UpdateComponent } from './update/update.component';
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
    StoreModule.forRoot({ people: fromPeopleReducer.reducer }, { metaReducers }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production })
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
  providers: [
    PeopleService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthorizationInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: CachableInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
