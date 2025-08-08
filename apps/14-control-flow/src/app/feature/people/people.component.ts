import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { merge, Subject, switchMap } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { People } from '../../shared/models/people.model';
import { MatListModule } from '@angular/material/list';
import { NgOptimizedImage } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  imports: [CardComponent, MatListModule, NgOptimizedImage, MatIconModule, MatButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent {
  private readonly peopleService = inject(PeopleService);

  private readonly triggerDeletePeople$ = new Subject<string>();
  private readonly retrievePeople$ = this.peopleService.getPeople();
  private readonly deletePeople$ = this.triggerDeletePeople$.pipe(switchMap(id => this.peopleService.deletePeople(id)));
  private peopleFlow$ = merge(this.retrievePeople$, this.deletePeople$);

  people = toSignal(this.peopleFlow$, { initialValue: [] });

  deletePerson({ id }: People): void {
    this.triggerDeletePeople$.next(id);
  }
}
