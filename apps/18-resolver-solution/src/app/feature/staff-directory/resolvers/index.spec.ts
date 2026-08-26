import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, convertToParamMap, RouterStateSnapshot } from '@angular/router';
import { PEOPLE_MOCK, Person } from '@sfeir/types';
import { firstValueFrom, Observable, of } from 'rxjs';
import { People } from '../../../core/provider/people';
import { PersonDetailsResolver } from './index';

const PERSON = PEOPLE_MOCK[0];

describe('PersonDetailsResolver', () => {
  let getPersonSpy: ReturnType<typeof vi.fn<(id: string) => Observable<Person>>>;

  beforeEach(() => {
    getPersonSpy = vi.fn((_id: string) => of(PERSON));
    TestBed.configureTestingModule({
      providers: [{ provide: People, useValue: { getPerson: getPersonSpy } satisfies Partial<People> }],
    });
  });

  function runResolver(id: string): Observable<Person> {
    const route = { paramMap: convertToParamMap({ id }) } as ActivatedRouteSnapshot;
    return TestBed.runInInjectionContext(() => PersonDetailsResolver(route, {} as RouterStateSnapshot)) as Observable<Person>;
  }

  it('should read the id route param and fetch the matching person', async () => {
    const result = runResolver(PERSON.id);
    expect(getPersonSpy).toHaveBeenCalledExactlyOnceWith(PERSON.id);
    expect(await firstValueFrom(result)).toEqual(PERSON);
  });
});
