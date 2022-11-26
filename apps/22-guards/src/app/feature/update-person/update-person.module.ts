import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { UpdatePersonRoutingModule } from './update-person-routing.module';
import { UpdatePersonComponent } from './update-person.component';

@NgModule({
  imports: [UpdatePersonRoutingModule, SharedModule],
  declarations: [UpdatePersonComponent],
})
export default class UpdatePersonModule {}
