import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MyPipePipe } from './my-pipe.pipe';

@NgModule({
  declarations: [AppComponent, MyPipePipe],
  imports: [BrowserModule],
  providers: [MyPipePipe],
  bootstrap: [AppComponent]
})
export class AppModule {}
