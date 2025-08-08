import { enableProdMode, provideZonelessChangeDetection } from '@angular/core';
import { environment } from './environments/environment';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, { providers: [provideZonelessChangeDetection(), provideHttpClient(withFetch())] }).catch(console.error);
