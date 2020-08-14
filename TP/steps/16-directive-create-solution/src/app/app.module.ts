// CORE DEPS
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
// MATERIAL DESIGN MODULES
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
import { PeopleAppComponent } from './app.component';
import { APP_ROUTES } from './app.routes';
import { HomeComponent } from './home';
import { PeopleComponent } from './people';
import { SfeirBadgeDirective } from './shared/badge';
import { CardComponent } from './shared/card';
import { NaPipe } from './shared/na-pipe';
import { PeopleService } from './shared/people-service';

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
    APP_ROUTES,
    HttpClientModule,
    ReactiveFormsModule
  ],
  declarations: [PeopleAppComponent, HomeComponent, PeopleComponent, CardComponent, NaPipe, SfeirBadgeDirective],
  entryComponents: [],
  providers: [PeopleService],
  bootstrap: [PeopleAppComponent]
})
export class AppModule {}
