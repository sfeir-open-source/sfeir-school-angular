import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Card } from '@sfeir/ui/card';
import { People } from '../../core/provider/people';
import { Loader } from '@sfeir/ui/loader';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [MatButtonModule, Card, Loader],
})
export class Home {
  private readonly _peopleService = inject(People);
  protected readonly _personResource = this._peopleService.getRandomPerson();

  handleRefresh(): void {
    this._personResource.reload();
  }
}
