import '@analogjs/vitest-angular/setup-zone';
import '@angular/compiler';

import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

@NgModule({
  providers: [provideZonelessChangeDetection()],
})
export class ZonelessModule {}

getTestBed().initTestEnvironment([BrowserTestingModule, ZonelessModule], platformBrowserTesting());
