import { Component, OnInit } from '@angular/core';
import { PeopleService } from '../shared/people-service';
import { People } from '../people.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';
import { flatMap } from 'rxjs/operators';

@Component({
  selector: 'sfeir-people',
  templateUrl: 'people.component.html',
  styleUrls: ['people.component.css']
})
export class PeopleComponent implements OnInit {
  private addDialog: MatDialogRef<AddDialogComponent>;
  people: People[] = [];
  dialogStatus = 'inactive';
  view = 'card';

  constructor(private readonly peopleService: PeopleService, public dialog: MatDialog) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.peopleService.fetch().subscribe(people => (this.people = people));
  }

  delete(person: People) {
    this.peopleService.delete(person.id).subscribe(people => (this.people = people));
  }

  add(person: People) {
    this.peopleService
      .create(person)
      .pipe(flatMap(() => this.peopleService.fetch()))
      .subscribe(people => {
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
