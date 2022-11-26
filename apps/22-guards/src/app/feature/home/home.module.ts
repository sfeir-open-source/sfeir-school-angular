import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [HomeRoutingModule, SharedModule],
  exports: [],
  declarations: [HomeComponent],
  providers: [],
})
export default class HomeModule {}
