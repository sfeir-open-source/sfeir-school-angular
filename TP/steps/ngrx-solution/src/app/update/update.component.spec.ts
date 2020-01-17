/* tslint:disable:no-unused-variable */

import { PeopleService } from './../shared/people-service/people.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UpdateComponent } from './update.component';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

const expectedResponse = {
  id: '123',
  firstname: 'Wassim',
  lastname: 'Chegham',
  email: 'chegham.w@sfeir.com',
  address: {
    street: '48 Rue Jacques Dulud',
    city: 'Neuilly-sur-Seine',
    postalCode: '92200'
  },
  phone: '0141385200',
  isManager: false
};

export const mockRouter = {
  navigate: jasmine.createSpy('navigate')
};

export class MockActivatedRoute {
  private _params: {};
  private paramsSubject: BehaviorSubject<any>;
  constructor() {
    this.paramsSubject = new BehaviorSubject(this._params);
  }
  get params() {
    return this.paramsSubject.asObservable();
  }
  set params(params: any) {
    this._params = params;
    this.paramsSubject.next(params);
  }
}

export class MockPeopleService {
  fetchOne(id) {
    return Observable.create(o => o.next(expectedResponse));
  }
  update(person: any) {
    return Observable.create(o => o.next(Object.assign(expectedResponse, person)));
  }
}

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;
  let mockActivatedRoute: MockActivatedRoute;
  let mockPeopleService: MockPeopleService;

  beforeEach(() => {
    mockActivatedRoute = new MockActivatedRoute();
    mockPeopleService = new MockPeopleService();

    TestBed.configureTestingModule({
      declarations: [UpdateComponent],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter },
        { provide: PeopleService, useValue: mockPeopleService }
      ],
      // Tells the compiler not to error on unknown elements and attributes
      schemas: [NO_ERRORS_SCHEMA]
    });
  });

  it('should create an instance of UpdateComponent', () => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    mockActivatedRoute.params = { id: 123 };

    fixture.detectChanges();

    expect(component).toBeTruthy('The instance of UpdateComponent was not created!');
  });

  it('should fetch person with id=123', () => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    mockActivatedRoute.params = { id: 123 };

    fixture.detectChanges();

    expect(component.person).toBeTruthy();
    expect(component.person.id).toBe('123');
    expect(component.person.firstname).toBe('Wassim');
    expect(component.person.lastname).toBe('Chegham');
  });

  it('should navigate to /people when updating info', () => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    mockActivatedRoute.params = { id: 123 };
    component.submit({ isManager: true });

    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/people']);
  });

  it('should navigate to /people when cancelling', () => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    mockActivatedRoute.params = { id: 123 };
    component.cancel();

    fixture.detectChanges();

    expect(mockRouter.navigate).toHaveBeenCalledWith(['/people']);
  });
});
