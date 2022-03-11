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
    /**TODO:
     * A l'aide de l'exemple ci-dessus, testez la méthode getRandomPeople
     */
  });

  it('should retrieve the details of a person by id', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const personId = '1';

    /**TODO:
     * A l'aide de l'exemple ci-dessus, testez la méthode getPersonDetails
     */
  });

  it('should delete a person by id', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const personId = '1';

    /**TODO:
     * A l'aide de l'exemple ci-dessus, testez la méthode deletePeople
     */
  });

  it('should create a new person', () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const newPerson = {
      id: '3',
      lastname: 'Luxembourg',
      firstname: 'Sfeir',
    } as People;
    /**TODO:
     * A l'aide de l'exemple ci-dessus, testez la méthode addNewPerson
     */
  });

  it('should update a person by id', () => {
    const updatePerson = {
      id: '1',
      lastname: 'Kondo',
      firstname: 'Tine',
    } as People;
    /**TODO:
     * A l'aide de l'exemple ci-dessus, testez la méthode updatePerson
     */
  });
});
