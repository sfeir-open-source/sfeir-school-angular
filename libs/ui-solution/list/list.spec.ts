import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { render } from '@testing-library/angular';
import { List } from './list';

type Item = { id: number; name: string };

@Component({
  selector: 'sfeir-test-host',
  imports: [List, MatListModule],
  template: `
    <sfeir-list [data]="data">
      <ng-template #item let-person>
        <mat-list-item>
          <span matListItemAvatar>A</span>
          <span matListItemTitle>{{ person.name }}</span>
        </mat-list-item>
      </ng-template>
    </sfeir-list>
  `,
})
class TestHost {
  data: Item[] = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Jane' },
  ];
}

describe('List', () => {
  it('renders one mat-list-item per data entry', async () => {
    const { container } = await render(TestHost);
    expect(container.querySelectorAll('mat-list-item').length).toBe(2);
  });

  it('correctly applies the MDC leading-avatar layout when the projected template uses matListItemAvatar', async () => {
    const { container } = await render(TestHost);
    const listItem = container.querySelector('mat-list-item');
    expect(listItem).toHaveClass('mdc-list-item--with-leading-avatar');
    expect(listItem?.querySelector('[matlistitemavatar]')).not.toBeNull();
  });

  it('renders the projected content of each item', async () => {
    const { container } = await render(TestHost);
    const titles = Array.from(container.querySelectorAll('[matlistitemtitle]')).map(el => el.textContent?.trim());
    expect(titles).toEqual(['John', 'Jane']);
  });
});
