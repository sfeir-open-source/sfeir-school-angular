import '@angular/compiler';
import '@analogjs/vitest-angular/setup-zone';

import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { getTestBed } from '@angular/core/testing';
import { NgModule, provideZonelessChangeDetection } from '@angular/core';

@NgModule({
  providers: [provideZonelessChangeDetection()],
})
export class ZonelessModule {}

getTestBed().initTestEnvironment([BrowserTestingModule, ZonelessModule], platformBrowserTesting());
