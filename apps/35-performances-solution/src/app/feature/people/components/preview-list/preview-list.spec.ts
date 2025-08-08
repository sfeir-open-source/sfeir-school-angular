import type { ComponentFixture } from '@angular/core/testing';
import { render } from '@testing-library/angular';
import type { People } from '../../../../shared/models/people.model';
import { PreviewList } from './preview-list';

const MOCK_PEOPLE: People[] = [
  {
    id: '1',
    firstname: 'Alice',
    lastname: 'Smith',
    entity: 'Engineering',
    email: 'alice.smith@example.com',
    phone: '1234567890',
    manager: 'Bob Johnson',
    isManager: true,
    photo: 'https://randomuser.me/api/portraits/women/1.jpg',
  },
  {
    id: '2',
    firstname: 'Bob',
    lastname: 'Johnson',
    entity: 'HR',
    email: 'bob.johnson@example.com',
    phone: '0987654321',
    manager: 'Alice Smith',
    isManager: false,
    photo: 'https://randomuser.me/api/portraits/men/2.jpg',
  },
] as People[];

describe('PreviewList', () => {
  let fixture: ComponentFixture<PreviewList>;
  let component: PreviewList;

  beforeEach(async () => {
    const { fixture: componentFixture } = await render(PreviewList, { inputs: { people: MOCK_PEOPLE } });
    fixture = componentFixture;
    component = fixture.componentInstance;
  });

  describe('Basic rendering', () => {
    test('should create an instance of PreviewList', () => {
      expect(component).toBeTruthy();
      expect(component).toBeInstanceOf(PreviewList);
    });
    test('should display the list of people', () => {
      const peopleList = fixture.nativeElement.querySelector('mat-list');
      expect(peopleList).toBeTruthy();
    });
    test('should display the correct number of people', () => {
      const peopleList = fixture.nativeElement.querySelectorAll('mat-list-item');
      expect(peopleList.length).toEqual(MOCK_PEOPLE.length);
    });
  });
});
