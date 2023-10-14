import { CommonModule } from '@angular/common';
import { Component, DebugElement, Input } from '@angular/core';
import { ComponentFixture, fakeAsync } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { By } from '@angular/platform-browser';
import { fireEvent, render } from '@testing-library/angular';
import { of } from 'rxjs';
import { PeopleService } from '../../core/providers/people.service';
import { CardComponent } from '../../shared/components/card/card.component';
import { People } from '../../shared/models/people.model';
import { HomeComponent } from './home.component';

@Component({
  selector: 'sfeir-card',
  template: '',
  standalone: true,
})
class MockCardComponent {
  @Input() person: People;
}

const PEOPLE_SERVICE = {
  getRandomPeople: jest.fn(),
  getPeople: jest.fn(),
};

const PERSON: People = {
  id: '1',
} as People;

describe('HomeComponent', () => {
  let component: HomeComponent;
  let container: Element;
  let debugElement: DebugElement;
  let componentFixture: ComponentFixture<HomeComponent>;

  beforeAll(() => {
    jest.spyOn(PEOPLE_SERVICE, 'getRandomPeople').mockReturnValue(of(PERSON));
  });
  beforeEach(async () => {
    const { fixture, container: renderedElement } = await render(HomeComponent, {
      componentImports: [CommonModule, MockCardComponent, MatButtonModule],
      providers: [{ provide: PeopleService, useValue: PEOPLE_SERVICE }],
    });
    component = fixture.componentInstance;
    container = renderedElement;
    debugElement = fixture.debugElement;
    componentFixture = fixture;
  });

  test('should create an instance of HomeComponent', () => {
    expect(component).toBeInstanceOf(HomeComponent);
  });
  test('should display the component sfeir-card', () => {
    const sfeirCard = container.querySelector('sfeir-card');
    expect(sfeirCard).toBeTruthy();
  });
  test('should pass the input person', () => {
    const sfeirCard: CardComponent = debugElement.query(By.css('sfeir-card')).componentInstance;
    expect(sfeirCard.person).toEqual(PERSON);
  });
  test('should call the getRandomPerson', () => {
    const spy = jest.spyOn(component, 'getRandomPerson');
    const button = container.querySelector('button[mat-fab]');
    fireEvent.click(button);
    expect(spy).toHaveBeenCalled();
    expect(spy).toHaveBeenCalledTimes(1);
  });
  test('should call the getRandomPerson when delete', () => {
    const spy = jest.spyOn(component, 'getRandomPerson');
    const customEvent = new CustomEvent('personDelete');
    const sfeirCard: HTMLElement = debugElement.query(By.css('sfeir-card')).nativeElement;
    fireEvent(sfeirCard, customEvent);
    expect(spy).toHaveBeenCalled();
  });
  test('should change the person', fakeAsync(async () => {
    const RANDOM_PERSON = { id: '2' } as People;
    jest.spyOn(PEOPLE_SERVICE, 'getRandomPeople').mockReturnValue(of(RANDOM_PERSON));
    component.getRandomPerson();
    await componentFixture.whenStable();
    componentFixture.detectChanges();
    const sfeirCard: CardComponent = debugElement.query(By.css('sfeir-card')).componentInstance;
    expect(sfeirCard.person).toEqual(RANDOM_PERSON);
  }));
});
