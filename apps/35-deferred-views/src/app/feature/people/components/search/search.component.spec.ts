import { NO_ERRORS_SCHEMA } from '@angular/core';
import { fireEvent, render } from '@testing-library/angular';
import { SearchComponent } from './search.component';
import { fakeAsync, flush } from '@angular/core/testing';

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
      schemas: [NO_ERRORS_SCHEMA],
      componentInputs: {
        searchText: 'SFEIR',
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
    await rerender({ componentInputs: { searchText: 'sfeir' } });
    expect(spy).toHaveBeenCalledWith('sfeir', { emitEvent: false });
  });
  test('should emit the search event', fakeAsync(() => {
    const element = container.querySelector<HTMLInputElement>('input[placeholder="Person Searcher"]');
    fireEvent.input(element, { target: { value: 'test' } });
    flush();
    component.search.subscribe(input => {
      expect(input).toBe('test');
    });
  }));
});
