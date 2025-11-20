import '@analogjs/vitest-angular/setup-snapshots';
import '@angular/compiler';

import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';
import { NgModule, provideZonelessChangeDetection } from '@angular/core';

@NgModule({
  providers: [provideZonelessChangeDetection()],
})
export class ZonelessModule {}

getTestBed().initTestEnvironment([BrowserTestingModule, ZonelessModule], platformBrowserTesting());
