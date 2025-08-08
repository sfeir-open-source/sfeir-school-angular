import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { fireEvent, render, screen } from '@testing-library/angular';
import { PEOPLE } from '../../mocks/people.mock';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let debugElement: DebugElement;

  beforeEach(async () => {
    const { fixture } = await render(HomeComponent, { schemas: [NO_ERRORS_SCHEMA] });
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  test('should create an instance of HomeComponent', () => {
    expect(component).toBeInstanceOf(HomeComponent);
  });
  test('should create a people set to the first person of the PEOPLE mock', () => {
    const [firstPerson] = PEOPLE;
    expect(component.person()).toEqual(firstPerson);
  });
  test('should create a card', () => {
    const card = debugElement.query(By.css('mat-card'));
    expect(card).toBeTruthy();
  });
  test('should display the image of the person', () => {
    const image: HTMLImageElement = screen.getByAltText('person-photo');
    expect(image).toBeTruthy();
    expect(image.getAttribute('height')).toEqual('128');
    expect(image.getAttribute('width')).toEqual('128');
    expect(image.getAttribute('src')).toEqual(component.person().photo);
  });
  test('should display the name of the person', () => {
    const title: HTMLElement = debugElement.query(By.css('mat-card-title')).nativeElement;
    expect(title.textContent).toContain(component.person().firstname);
    expect(title.textContent).toContain(component.person().lastname);
  });
  test('should display three subtitle', () => {
    const subtitle: HTMLElement[] = debugElement.queryAll(By.css('mat-card-subtitle')).map(el => el.nativeElement);
    expect(subtitle).toHaveLength(3);
  });
  test('should display the entity of the person as a subtitle', () => {
    const [entity]: HTMLElement[] = debugElement.queryAll(By.css('mat-card-subtitle')).map(el => el.nativeElement);
    expect(entity.textContent).toContain(component.person().entity);
  });
  test('should display the mail of the person as a subtitle', () => {
    const [, email]: HTMLElement[] = debugElement.queryAll(By.css('mat-card-subtitle')).map(el => el.nativeElement);
    expect(email.textContent).toContain(component.person().email);
  });
  test('should display the phone of the person as subtitle', () => {
    const [, , phone]: HTMLElement[] = debugElement.queryAll(By.css('mat-card-subtitle')).map(el => el.nativeElement);
    expect(phone.textContent).toContain(component.person().phone);
  });
  test('should display the manager of the person', () => {
    const cardContent: DebugElement = debugElement.query(By.css('mat-card-content'));
    const manager: HTMLElement = cardContent.queryAll(By.css('.contact-info'))[0].nativeElement;
    expect(manager.textContent).toContain(component.person().manager);
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
});
