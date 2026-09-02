import { computed, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { patchState, signalStore, withComputed, withHooks, withMethods, withProps, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Person, UiView, UpsertPersonBody } from '@sfeir/types';
import { filter, mergeMap, pipe, switchMap, tap } from 'rxjs';
import { People } from '../../core/provider/people';
import { DialogPerson } from './dialog-person/dialog-person';

export type StaffDirectoryState = {
  people: Person[];
  search: string;
  isLoading: boolean;
  view: UiView;
};

const INITIAL_STATE: StaffDirectoryState = {
  people: [],
  search: '',
  view: 'card',
  isLoading: false,
};

export const StaffDirectoryStore = signalStore(
  withState(INITIAL_STATE),
  withProps(() => ({
    _peopleService: inject(People),
    _matDialog: inject(MatDialog),
  })),
  withComputed(({ search, people }) => ({
    filteredPeople: computed(() =>
      people().filter(p => p.firstname.toLowerCase().includes(search().toLowerCase()) || p.lastname.toLowerCase().includes(search().toLowerCase())),
    ),
  })),
  withMethods(({ _peopleService, _matDialog, ...store }) => ({
    getPeople: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        mergeMap(() =>
          _peopleService.getPeople().pipe(
            tap({
              next: people => patchState(store, { people }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    deletePerson: rxMethod<string>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        switchMap(id =>
          _peopleService.removePerson(id).pipe(
            tap({
              next: people => patchState(store, { people }),
              error: console.error,
              finalize: () => patchState(store, { isLoading: false }),
            }),
          ),
        ),
      ),
    ),
    addPerson: rxMethod<void>(
      pipe(
        mergeMap(() =>
          _matDialog
            .open<DialogPerson, UpsertPersonBody | undefined>(DialogPerson)
            .afterClosed()
            .pipe(
              filter(Boolean),
              tap(() => patchState(store, { isLoading: true })),
              switchMap(formValue =>
                _peopleService.addPerson(formValue).pipe(
                  switchMap(() =>
                    _peopleService.getPeople().pipe(
                      tap({
                        next: people => patchState(store, { people }),
                        error: console.error,
                        finalize: () => patchState(store, { isLoading: false }),
                      }),
                    ),
                  ),
                ),
              ),
            ),
        ),
      ),
    ),
    changeView: () => patchState(store, state => ({ view: (state.view === 'card' ? 'list' : 'card') as UiView })),
  })),
  withHooks({
    onInit: store => {
      store.getPeople();
    },
  }),
);
