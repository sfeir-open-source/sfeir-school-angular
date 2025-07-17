import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { People } from '../../shared/models/people.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardComponent } from '../../shared/components/card/card.component';
import { merge, Subject, switchMap } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  imports: [CardComponent],
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
