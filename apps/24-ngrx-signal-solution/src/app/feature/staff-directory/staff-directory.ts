import { NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { Card } from '@sfeir/ui-solution/card';
import { King } from '@sfeir/ui-solution/king';
import { List } from '@sfeir/ui-solution/list';
import { Loader } from '@sfeir/ui-solution/loader';
import { StaffDirectoryStore } from './staff-directory-store';

@Component({
  selector: 'sfeir-staff-directory',
  templateUrl: './staff-directory.html',
  styleUrl: './staff-directory.scss',
  imports: [Card, MatButtonModule, MatListModule, NgOptimizedImage, King, Loader, MatDialogModule, List],
})
export class StaffDirectory {
  protected readonly _store = inject(StaffDirectoryStore);
}
