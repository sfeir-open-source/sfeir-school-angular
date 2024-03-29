import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { fireEvent, render, screen } from '@testing-library/angular';
import { of } from 'rxjs';
import { People } from '../../shared/models/people.model';
import { HomeComponent } from './home.component';

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
  get: jest.fn(),
};

describe('HomeComponent', () => {
  let component: HomeComponent;
  let debugElement: DebugElement;
  let componentFixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    jest.spyOn(HTTP_CLIENT, 'get').mockReturnValue(of(PERSON));
    const { fixture } = await render(HomeComponent, {
      imports: [CommonModule],
      providers: [{ provide: HttpClient, useValue: HTTP_CLIENT }],
      schemas: [NO_ERRORS_SCHEMA],
    });
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    componentFixture = fixture;
  });

  test('should create an instance of HomeCOmponent', () => {
    expect(component).toBeInstanceOf(HomeComponent);
  });
  test('should display the card', () => {
    const card = debugElement.query(By.css('mat-card'));
    expect(card).toBeTruthy();
  });
  test('should display the image of the person', () => {
    const image: HTMLImageElement = screen.getByAltText('person-photo');
    expect(image).toBeTruthy();
    expect(image.getAttribute('height')).toEqual('128');
    expect(image.getAttribute('width')).toEqual('128');
    expect((image as any).ngSrc).toEqual(PERSON[0].photo);
  });
  test('should display the name of the person', () => {
    const title: HTMLElement = debugElement.query(By.css('mat-card-title')).nativeElement;
    expect(title.textContent).toContain(PERSON[0].firstname);
    expect(title.textContent).toContain(PERSON[0].lastname);
  });
  test('should display three subtitle', () => {
    const subtitle: HTMLElement[] = debugElement.queryAll(By.css('mat-card-subtitle')).map(el => el.nativeElement);
    expect(subtitle).toHaveLength(3);
  });
  test('should display the entity of the person as a subtitle', () => {
    const [entity]: HTMLElement[] = debugElement.queryAll(By.css('mat-card-subtitle')).map(el => el.nativeElement);
    expect(entity.textContent).toContain(PERSON[0].entity);
  });
  test('should display the mail of the person as a subtitle', () => {
    const [, email]: HTMLElement[] = debugElement.queryAll(By.css('mat-card-subtitle')).map(el => el.nativeElement);
    expect(email.textContent).toContain(PERSON[0].email);
  });
  test('should display the phone of the person as subtitle', () => {
    const [, , phone]: HTMLElement[] = debugElement.queryAll(By.css('mat-card-subtitle')).map(el => el.nativeElement);
    expect(phone.textContent).toContain(PERSON[0].phone);
  });
  test('should display the manager of the person', () => {
    const cardContent: DebugElement = debugElement.query(By.css('mat-card-content'));
    const manager: HTMLElement = cardContent.queryAll(By.css('.contact-info'))[0].nativeElement;
    expect(manager.textContent).toContain(PERSON[0].manager);
  });
  test('should display three action buttons', () => {
    const buttons: HTMLAnchorElement[] = debugElement.queryAll(By.css('[mat-button]')).map(el => el.nativeElement);
    expect(buttons).toHaveLength(3);

    const [map, create, del] = buttons;
    expect(map.title).toEqual('Locate');
    expect(create.title).toEqual('Edit');
    expect(del.title).toEqual('Delete');
  });
  test('should display a random button', () => {
    const randomButton: HTMLButtonElement = debugElement.query(By.css('[mat-fab]')).nativeElement;
    expect(randomButton).toBeTruthy();
  });
  test('should call the method getRandomPerson', () => {
    const spy = jest.spyOn(component, 'getRandomPerson');
    const randomButton: HTMLButtonElement = debugElement.query(By.css('[mat-fab]')).nativeElement;
    fireEvent.click(randomButton);
    expect(spy).toHaveBeenCalled();
  });
  test('should change the person', () => {
    jest.spyOn(HTTP_CLIENT, 'get').mockReturnValue(of(PERSON[1]));
    component.getRandomPerson();
    componentFixture.detectChanges();
    const title: HTMLElement = debugElement.query(By.css('mat-card-title')).nativeElement;
    expect(title.textContent).toContain(PERSON[1].firstname);
    expect(title.textContent).toContain(PERSON[1].lastname);
  });
});
