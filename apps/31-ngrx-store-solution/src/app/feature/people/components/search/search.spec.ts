import { ComponentFixture } from '@angular/core/testing';
import { SearchBar } from './search-bar';
import { render } from '@testing-library/angular';

const SEARCH = jest.fn();

describe('SearchBar', () => {
  let fixture: ComponentFixture<SearchBar>;
  let component: SearchBar;

  beforeEach(async () => {
    const { fixture: componentFixture } = await render(SearchBar, {
      inputs: { initialSearch: 'sfeir' },
      on: {
        search: SEARCH,
      },
    });
    fixture = componentFixture;
    component = fixture.componentInstance;
  });

  test('should create an instance of SearchBar', () => {
    expect(component).toBeInstanceOf(SearchBar);
  });
  test('should set the control to the initial search', () => {
    expect(component.searchControl.value).toEqual('sfeir');
  });
  test('should emit the search value', done => {
    component.searchControl.patchValue('Hello');
    setTimeout(() => {
      expect(SEARCH).toHaveBeenCalledWith('Hello');
      done();
    }, 400);
  });
});
