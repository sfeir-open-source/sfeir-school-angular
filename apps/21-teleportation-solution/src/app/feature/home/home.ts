import { Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Card } from '@sfeir/ui-solution/card';
import { Loader } from '@sfeir/ui-solution/loader';
import { People } from '../../core/provider/people';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
  imports: [MatButtonModule, Card, Loader],
})
export class Home {
  private readonly _peopleService = inject(People);
  protected readonly _personResource = this._peopleService.getRandomPerson();
  protected readonly _isLoading = computed(() => this._personResource.isLoading() && !this._personResource.hasValue());

  handleRefresh(): void {
    this._personResource.reload();
  }
}
