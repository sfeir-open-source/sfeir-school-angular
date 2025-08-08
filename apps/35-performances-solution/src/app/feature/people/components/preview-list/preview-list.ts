import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { People } from '../../../../shared/models/people.model';
import { MatListModule } from '@angular/material/list';
import { Badge } from '../../../../shared/directives/badge';
import { NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'sfeir-people-preview-list',
  template: `
    <mat-list>
      @for (person of people(); track person.id) {
        <mat-list-item class="mat-whiteframe-2dp mat-card">
          <img alt="person-image" [ngSrc]="person.photo" matListItemAvatar height="40" width="40" />
          <h3 matListItemLine>
            {{ person.firstname }} {{ person.lastname }}
            <span class="sfeir-badge" [sfeirBadge]="person.isManager"></span>
          </h3>
          <p matListItemLine>
            <span> {{ person.entity }} </span> — <span>{{ person.email }} </span>
          </p>
        </mat-list-item>
      }
    </mat-list>
  `,
  styles: `
    @media (min-width: 768px) {
      :host(.wide) mat-list-item {
        width: 600px;
      }
    }

    .mat-whiteframe-2dp {
      box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12);
      color: rgba(0, 0, 0, 0.87);
      background-color: white;
      margin: 10px;
      width: 360px;
      padding: 0;
      margin-left: -12px;
      font-size: 14px;
      display: flex;

      h3 {
        display: flex;
        align-items: flex-start;

        .sfeir-badge {
          margin-left: 0.5rem;
        }
      }
    }
  `,
  imports: [MatListModule, Badge, NgOptimizedImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PreviewList {
  people = input.required<People[]>();
}
