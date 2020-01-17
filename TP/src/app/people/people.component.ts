import { mergeMap } from 'rxjs/operators';

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AddDialogComponent } from './add-dialog/add-dialog.component';

const BASE_URL = 'http://localhost:9000';

@Component({
  selector: 'sfeir-people',
  templateUrl: 'people.component.html',
  styleUrls: ['people.component.css']
})
export class PeopleComponent implements OnInit {
  private addDialog: MatDialogRef<AddDialogComponent>;
  people;
  dialogStatus = 'inactive';

  constructor(private _http: HttpClient, public dialog: MatDialog) {}

  /**
   * OnInit implementation
   */
  ngOnInit() {
    this._http.get(`${BASE_URL}/api/peoples/`).subscribe(people => (this.people = people));
  }

  delete(person: any) {
    this._http.delete(`${BASE_URL}/api/peoples/${person.id}`).subscribe(people => (this.people = people));
  }

  add(person: any) {
    this._http
      .post(`${BASE_URL}/api/peoples/`, person)
      .pipe(mergeMap(res => this._http.get(`${BASE_URL}/api/peoples/`)))
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
}
