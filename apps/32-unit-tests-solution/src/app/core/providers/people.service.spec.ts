import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { People } from '../../shared/models/people.model';
import { PeopleService } from './people.service';

const MOCK_PEOPLE = [
  {
    id: '1',
    lastname: 'Doe',
    firstname: 'John',
  },
  {
    id: '2',
    lastname: 'Frizzarin',
    firstname: 'Nicolas',
  },
] as Array<People>;

describe('PeopleService', () => {
  let peopleService: PeopleService;
  let httpTestingController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
        providers: [PeopleService],
      });
    })
  );

  beforeEach(() => {
    peopleService = TestBed.inject(PeopleService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return a list of people', () => {
    peopleService.getPeople().subscribe(people => {
      expect(people).toEqual(MOCK_PEOPLE);
    });

    const request = httpTestingController.expectOne(`${environment.peopleEndpoint}/peoples`);
    expect(request.request.method).toEqual('GET');
    request.flush(MOCK_PEOPLE);
  });

  it('should return a random person', () => {
    peopleService.getRandomPeople().subscribe(person => {
      expect(person).toEqual(MOCK_PEOPLE[0]);
    });

    const request = httpTestingController.expectOne(`${environment.peopleEndpoint}/peoples/random`);
    expect(request.request.method).toEqual('GET');
    request.flush(MOCK_PEOPLE[0]);
  });

  it('should retrieve the details of a person by id', () => {
    const personId = '1';

    peopleService.getPersonDetails(personId).subscribe(person => {
      expect(person).toEqual(MOCK_PEOPLE[0]);
    });

    const request = httpTestingController.expectOne(`${environment.peopleEndpoint}/peoples/${personId}`);
    expect(request.request.method).toEqual('GET');
    request.flush(MOCK_PEOPLE[0]);
  });

  it('should delete a person by id', () => {
    const personId = '1';

    peopleService.deletePeople(personId).subscribe(result => {
      console.log(result);
      expect(result.length).toEqual(1);
      expect(result[0].id).toEqual(MOCK_PEOPLE[0].id);
    });

    const request = httpTestingController.expectOne(`${environment.peopleEndpoint}/peoples/${personId}`);
    expect(request.request.method).toEqual('DELETE');
    MOCK_PEOPLE.splice(0, 1);
    request.flush(MOCK_PEOPLE);
  });

  it('should create a new person', () => {
    const newPerson = {
      id: '3',
      lastname: 'Luxembourg',
      firstname: 'Sfeir',
    } as People;

    peopleService.addNewPerson(newPerson as People).subscribe(person => {
      expect(person.id).toEqual(newPerson.id);
      expect(person.lastname).toEqual(newPerson.lastname);
      expect(person.firstname).toEqual(newPerson.firstname);
    });

    const request = httpTestingController.expectOne(`${environment.peopleEndpoint}/peoples`);
    expect(request.request.method).toEqual('POST');
    request.flush(newPerson);
  });

  it('should update a person by id', () => {
    const updatePerson = {
      id: '1',
      lastname: 'Kondo',
      firstname: 'Tine',
    } as People;

    peopleService.updatePerson(updatePerson).subscribe(person => {
      expect(person.id).toEqual(updatePerson.id);
      expect(person.lastname).toEqual(updatePerson.lastname);
      expect(person.firstname).toEqual(updatePerson.firstname);
    });

    const request = httpTestingController.expectOne(`${environment.peopleEndpoint}/peoples/${updatePerson.id}`);
    expect(request.request.method).toEqual('PUT');
    request.flush({ ...MOCK_PEOPLE[0], ...updatePerson });
  });
});
