import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { fireEvent, render, screen } from '@testing-library/angular';
import { People } from '../../models/people.model';
import { NaPipe } from '../../pipes/na.pipe';
import { CardComponent } from './card.component';

const PEOPLE: People = {
  firstname: 'John',
  lastname: 'Doe',
  entity: 'Company',
  email: 'john.doe@gmail.com',
  phone: '0123456789',
  manager: 'Jane Doe',
  photo: 'john-doe.jpg',
} as People;

const PERSON_DELETE = jest.fn();

describe('CardComponent', () => {
  let component: CardComponent;
  let debugElement: DebugElement;
  let rerender: any;

  beforeEach(async () => {
    const { fixture, rerender: reload } = await render(CardComponent, {
      componentProperties: { person: PEOPLE, personDelete: { emit: PERSON_DELETE } as any },
      declarations: [NaPipe],
      schemas: [NO_ERRORS_SCHEMA],
    });
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    rerender = reload;
  });

  test('should create an instance of CardComponent', () => {
    expect(component).toBeInstanceOf(CardComponent);
  });

  test('should the input person set to PEOPLE', () => {
    expect(component.person).toEqual(PEOPLE);
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
    expect((image as any).ngSrc).toEqual(PEOPLE.photo);
  });
  test('should display the name of the person', () => {
    const title: HTMLElement = debugElement.query(By.css('mat-card-title')).nativeElement;
    expect(title.textContent).toContain(PEOPLE.firstname);
    expect(title.textContent).toContain(PEOPLE.lastname);
  });
  test('should display three subtitle', () => {
    const subtitle: HTMLElement[] = debugElement.queryAll(By.css('mat-card-subtitle')).map(el => el.nativeElement);
    expect(subtitle).toHaveLength(3);
  });
  test('should display the entity of the person as a subtitle', () => {
    const [entity]: HTMLElement[] = debugElement.queryAll(By.css('mat-card-subtitle')).map(el => el.nativeElement);
    expect(entity.textContent).toContain(PEOPLE.entity);
  });
  test('should display the mail of the person as a subtitle', () => {
    const [, email]: HTMLElement[] = debugElement.queryAll(By.css('mat-card-subtitle')).map(el => el.nativeElement);
    expect(email.textContent).toContain(PEOPLE.email);
  });
  test('should display the phone of the person as subtitle', () => {
    const [, , phone]: HTMLElement[] = debugElement.queryAll(By.css('mat-card-subtitle')).map(el => el.nativeElement);
    expect(phone.textContent).toContain(PEOPLE.phone);
  });
  test('should display the manager of the person', () => {
    const cardContent: DebugElement = debugElement.query(By.css('mat-card-content'));
    const manager: HTMLElement = cardContent.queryAll(By.css('.contact-info'))[0].nativeElement;
    expect(manager.textContent).toContain(PEOPLE.manager);
  });
  test('should display three action buttons', () => {
    const buttons: HTMLAnchorElement[] = debugElement.queryAll(By.css('[mat-button]')).map(el => el.nativeElement);
    expect(buttons).toHaveLength(3);

    const [map, create, del] = buttons;
    expect(map.title).toEqual('Locate');
    expect(create.title).toEqual('Edit');
    expect(del.title).toEqual('Delete');
  });
  test('should display another person', async () => {
    const newPerson = { ...PEOPLE, firstname: 'Jane', lastname: 'Doe', photo: 'jane-doe.jpg' };
    await rerender({ componentProperties: { person: newPerson } });
    const image: HTMLImageElement = screen.getByAltText('person-photo');
    expect((image as any).ngSrc).toEqual(newPerson.photo);
  });
  test('should call the method deletePerson', () => {
    const spy = jest.spyOn(component, 'deletePerson');
    const buttonDelete = screen.getByTitle('Delete');
    fireEvent.click(buttonDelete);
    expect(spy).toHaveBeenCalledWith(PEOPLE);
  });
  test('should call the personDelete event emitter', () => {
    component.deletePerson(PEOPLE);
    expect(PERSON_DELETE).toHaveBeenCalledWith(PEOPLE);
  });
});
