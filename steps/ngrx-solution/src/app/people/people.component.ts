import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { PeopleService } from '../shared/people-service';
import { Store } from '@ngrx/store';
import { mergeMap } from 'rxjs/operators';
import { getSearch } from '../store/selectors/selectors';
import { filterPeople } from '../store/actions/people.actions';

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
    private store: Store<any>,
    private _http: HttpClient,
    public dialog: MatDialog,
    private _peopleService: PeopleService
  ) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.search$ = this.store.select(getSearch);
    this.people$ = this._peopleService.getPeople();
    this._peopleService.fetch().subscribe();
  }

  delete(person: any) {
    this._peopleService.delete(person.id).subscribe(people => (this.people$ = people));
  }

  add(person: any) {
    this._peopleService
      .update(person)
      .pipe(mergeMap(res => this._peopleService.fetch()))
      .subscribe((people: any[]) => {
        this.people$ = people;
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
