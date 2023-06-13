import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { fireEvent, render } from '@testing-library/angular';
import { SearchComponent } from './search.component';

const SEARCH_SPY = jest.fn();

describe('SearchComponent', () => {
  let container: Element;
  let component: SearchComponent;
  let rerender: any;

  beforeEach(async () => {
    const {
      fixture,
      container: hostContainer,
      rerender: reload,
    } = await render(SearchComponent, {
      imports: [ReactiveFormsModule],
      schemas: [NO_ERRORS_SCHEMA],
      componentProperties: {
        searchText: 'SFEIR',
        search: {
          emit: SEARCH_SPY,
        } as any,
      },
    });
    container = hostContainer;
    component = fixture.componentInstance;
    rerender = reload;
  });

  test('should create an instance of search', () => {
    expect(component).toBeInstanceOf(SearchComponent);
  });
  test('should bind correctly the input', async () => {
    const element = container.querySelector<HTMLInputElement>('input[placeholder="Person Searcher"]');
    expect(element.value).toBe('SFEIR');
  });
  test('should refresh the search control', async () => {
    const spy = jest.spyOn(component.searchControl, 'patchValue');
    await rerender({ componentProperties: { searchText: 'sfeir' } });
    expect(spy).toHaveBeenCalledWith('sfeir', { emitEvent: false });
  });
  test('should emit the search event', () => {
    const element = container.querySelector<HTMLInputElement>('input[placeholder="Person Searcher"]');
    fireEvent.input(element, { target: { value: 'test' } });
    expect(SEARCH_SPY).toHaveBeenCalledWith('test');
  });
});
