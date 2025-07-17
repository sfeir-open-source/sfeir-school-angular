import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { environment } from '../../../environments/environment';
import { People } from '../../shared/models/people.model';
import { toSignal } from '@angular/core/rxjs-interop';
import { CardComponent } from '../../shared/components/card/card.component';
import { merge, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss'],
  imports: [CardComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PeopleComponent {
  private readonly httpClient = inject(HttpClient);

  private readonly triggerDeletePeople$ = new Subject<string>();
  private readonly retrievePeople$ = this.httpClient.get<Array<People>>(`${environment.peopleEndpoint}/peoples`);
  private readonly deletePeople$ = this.triggerDeletePeople$.pipe(
    switchMap(id => this.httpClient.delete<Array<People>>(`${environment.peopleEndpoint}/peoples/${id}`)),
  );
  private peopleFlow$ = merge(this.retrievePeople$, this.deletePeople$);

  people = toSignal(this.peopleFlow$, { initialValue: [] });

  deletePerson({ id }: People): void {
    this.triggerDeletePeople$.next(id);
  }
}
