import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { mergeMap } from 'rxjs';
import { PeopleService } from '../shared/people-service';
import { filterPeople } from '../store/actions/people.actions';
import { getSearch } from '../store/selectors/selectors';
import { PeopleFeature } from '../store/state/state';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@Component({
  selector: 'sfeir-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {
  private addDialog: MatDialogRef<AddDialogComponent>;
  people$;
  search$;
  dialogStatus = 'inactive';
  view = 'card';

  constructor(
    private store: Store<PeopleFeature>,
    public dialog: MatDialog,
    private readonly peopleService: PeopleService
  ) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.search$ = this.store.select(getSearch);
    this.people$ = this.peopleService.getPeople();
    this.peopleService.fetch().subscribe();
  }

  delete(person: any) {
    this.peopleService
      .delete(person.id)
      .pipe(mergeMap(() => this.peopleService.fetch()))
      .subscribe();
  }

  add(person: any) {
    this.peopleService
      .update(person)
      .pipe(mergeMap(() => this.peopleService.fetch()))
      .subscribe(() => {
        this.hideDialog();
      });
  }

  showDialog() {
    this.dialogStatus = 'active';
    this.addDialog = this.dialog.open(AddDialogComponent, {
      width: '450px',
      data: {}
    });

    this.addDialog.afterClosed().subscribe(person => {
      this.dialogStatus = 'inactive';
      if (person) {
        this.add(person);
      }
    });
  }

  hideDialog() {
    this.dialogStatus = 'inactive';
    this.addDialog.close();
  }

  switchView() {
    this.view = this.view === 'card' ? 'list' : 'card';
  }

  onSearch(search) {
    this.store.dispatch(filterPeople({ search }));
  }
}
