import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { mergeMap } from 'rxjs';
import { PeopleService } from '../shared/people-service';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

@Component({
  selector: 'sfeir-people',
  templateUrl: 'people.component.html',
  styleUrls: ['people.component.css']
})
export class PeopleComponent implements OnInit {
  people;
  dialogStatus = 'inactive';
  view = 'card';
  private addDialog: MatDialogRef<AddDialogComponent>;

  constructor(private readonly peopleService: PeopleService, public dialog: MatDialog) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this.peopleService.fetch().subscribe(people => {
      this.people = people;
    });
  }

  delete(person: any) {
    this.peopleService.delete(person.id).subscribe(people => {
      this.people = people;
    });
  }

  add(person: any) {
    this.peopleService
      .create(person)
      .pipe(mergeMap(() => this.peopleService.fetch()))
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

  switchView(): void {
    this.view = this.view === 'card' ? 'list' : 'card';
  }
}
