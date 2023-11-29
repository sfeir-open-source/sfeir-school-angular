import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { BehaviorSubject, switchMap } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { CardComponent } from '../../shared/components/card/card.component';

@Component({
  selector: 'sfeir-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [CardComponent, MatButtonModule],
})
export class HomeComponent {
  readonly #peopleService: PeopleService = inject(PeopleService);

  #triggerNewPeople$ = new BehaviorSubject<null>(null);

  person = toSignal(this.#triggerNewPeople$.pipe(switchMap(() => this.#peopleService.getRandomPeople())), { initialValue: null });

  getRandomPerson(): void {
    this.#triggerNewPeople$.next(null);
  }
}
