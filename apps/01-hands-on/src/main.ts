import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';
import 'zone.js';

if (environment.production) {
  enableProdMode();
}

import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig);
