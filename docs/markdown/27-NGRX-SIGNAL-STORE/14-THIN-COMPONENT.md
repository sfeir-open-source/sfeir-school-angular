<!-- .slide: class="tc-multiple-columns with-code inconsolata" -->

##++##

# Before: a smart component

```typescript
export class StaffDirectory {
  private readonly _peopleService = inject(People);
  private readonly _matDialog = inject(MatDialog);
  private readonly _triggerUpsertPerson = new Subject<void>();
  private readonly _triggerDeletePerson = new Subject<string>();
  // ...3 RxJS flows merged with `merge(...)`...
  protected readonly _people = toSignal(this._personsFlow, { initialValue: [] });
  public readonly view = signal<UiView>('card');

  handleDelete(id: string): void { /* ... */ }
  handleChangeView(): void { /* ... */ }
  handleOpenAddDialog(): void { /* ... */ }
}
```

<!-- .element: class="small-code" -->

##++##
##++## class="with-code inconsolata"

# After: a thin consumer

```typescript
@Component({
  selector: 'sfeir-staff-directory',
  templateUrl: './staff-directory.html',
  imports: [Card, MatButtonModule, MatListModule,
            NgOptimizedImage, King, Loader,
            MatDialogModule, List],
})
export class StaffDirectory {
  protected readonly _store =
    inject(StaffDirectoryStore);
}
```

<!-- .element: class="small-code" -->

One field. No `People`, no `MatDialog`, no `Subject`, no RxJS operator import anywhere in this file anymore.

##++##

##==##

<!-- .slide: class="with-code inconsolata" -->

# The template reads/calls the store directly

```html
<sfeir-loader [isLoading]="_store.isLoading()">
  @switch (_store.view()) {
    @case ('card') {
      @for (person of _store.filteredPeople(); track person.id) {
        <sfeir-card [person]="person" (delete)="_store.deletePerson($event)" />
      }
    }
    @case ('list') { <sfeir-list [data]="_store.filteredPeople()"> ... </sfeir-list> }
  }
</sfeir-loader>

<button (click)="_store.addPerson()"> ... </button>
<button (click)="_store.changeView()"> ... </button>
```

<!-- .element: class="small-code" -->

Every reference to the old component signals/methods (`_isLoading`, `_people`, `view`, `handleDelete`, `handleChangeView`, `handleOpenAddDialog`) is replaced by the equivalent store member — `_store.isLoading()`, `_store.filteredPeople()`, `_store.view()`, `_store.deletePerson(id)`, `_store.addPerson()`, `_store.changeView()`.

##==##

# Container vs. presentational, one level up

This is the same instinct you already have for "smart vs. dumb" **components** (a container component managing state, a presentational one just rendering inputs) — applied here to a **store** instead of a parent component. `StaffDirectory` didn't get simpler by accident: every line of logic it used to own now has exactly one home, testable on its own, in `staff-directory-store.ts`.

<!-- .element: class="important" -->
