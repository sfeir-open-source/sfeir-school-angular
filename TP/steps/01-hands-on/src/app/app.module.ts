// CORE DEPS
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// MATERIAL DESIGN MODULES
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// import your component

@NgModule({
  imports: [BrowserModule, BrowserAnimationsModule, MatToolbarModule, MatCardModule],
  declarations: [
    // register your component
  ],
  providers: [],
  bootstrap: [
    // boostrap w/ the component
  ]
})
export class AppModule {}
