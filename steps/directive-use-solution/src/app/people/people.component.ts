import { mergeMap } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { PeopleService } from '../shared/people-service';

@Component({
  selector: 'sfeir-people',
  templateUrl: 'people.component.html',
  styleUrls: ['people.component.css']
})
export class PeopleComponent implements OnInit {
  private addDialog: MatDialogRef<AddDialogComponent>;
  people;
  dialogStatus = 'inactive';
  view = 'card';

  constructor(public dialog: MatDialog, private _peopleService: PeopleService) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._peopleService.fetch().subscribe(people => (this.people = people));
  }

  delete(person: any) {
    this._peopleService.delete(person.id).subscribe(people => (this.people = people));
  }

  add(person: any) {
    this._peopleService
      .update(person)
      .pipe(mergeMap(() => this._peopleService.fetch()))
      .subscribe((people: any[]) => {
        this.people = people;
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
}
