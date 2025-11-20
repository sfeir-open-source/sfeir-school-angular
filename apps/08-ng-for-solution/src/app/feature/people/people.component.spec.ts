import { CommonModule } from '@angular/common';
import { HttpClient, provideHttpClient } from '@angular/common/http';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { People } from '../../shared/models/people.model';
import { PeopleComponent } from './people.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { vi } from 'vitest';

const PERSON: People[] = [
  {
    id: '1',
    firstname: 'John',
    lastname: 'Doe',
    photo: 'john.png',
    email: 'john@gmail.com',
    phone: '+33656789980',
    manager: 'SFEIR',
    entity: 'Luxembourg',
  },
  { id: '2', firstname: 'Sfeir', lastname: 'Luxembourg', photo: 'sfeir.png' },
] as People[];

const HTTP_CLIENT = {
  get: vi.fn(),
};

describe('PeopleComponent', () => {
  let component: PeopleComponent;
  let debugElement: DebugElement;

  beforeAll(() => {
    vi.spyOn(HTTP_CLIENT, 'get').mockReturnValue(of(PERSON));
  });
  beforeEach(async () => {
    const { fixture } = await render(PeopleComponent, {
      providers: [provideHttpClient(), provideHttpClientTesting(), { provide: HttpClient, useValue: HTTP_CLIENT }],
      imports: [CommonModule],
      schemas: [NO_ERRORS_SCHEMA],
    });
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  test('should create an instance of PeopleComponent', () => {
    expect(component).toBeInstanceOf(PeopleComponent);
  });
  test('should display two mat-card', () => {
    const sfeirCard = debugElement.queryAll(By.css('mat-card'));
    expect(sfeirCard.length).toBe(2);
  });
  test('should the first card display the john doe person', () => {
    const [johnCard] = debugElement.queryAll(By.css('mat-card'));
    const johnImage: HTMLImageElement = johnCard.query(By.css('img')).nativeElement;
    expect(johnImage).toBeTruthy();
    expect(johnImage.getAttribute('height')).toEqual('128');
    expect(johnImage.getAttribute('width')).toEqual('128');
    expect(johnImage.getAttribute('src')).toEqual(PERSON[0].photo);
    const johnName = johnCard.query(By.css('mat-card-title')).nativeElement;
    expect(johnName).toBeTruthy();
    expect(johnName.textContent).toEqual(`${PERSON[0].firstname} ${PERSON[0].lastname}`);
  });
  test('should the second card display the sfeir person', () => {
    const [, sfeirCard] = debugElement.queryAll(By.css('mat-card'));
    const sfeirImage: HTMLImageElement = sfeirCard.query(By.css('img')).nativeElement;
    expect(sfeirImage).toBeTruthy();
    expect(sfeirImage.getAttribute('height')).toEqual('128');
    expect(sfeirImage.getAttribute('width')).toEqual('128');
    expect(sfeirImage.getAttribute('src')).toEqual(PERSON[1].photo);
    const sfeirName = sfeirCard.query(By.css('mat-card-title')).nativeElement;
    expect(sfeirName).toBeTruthy();
    expect(sfeirName.textContent).toEqual(`${PERSON[1].firstname} ${PERSON[1].lastname}`);
  });
});
