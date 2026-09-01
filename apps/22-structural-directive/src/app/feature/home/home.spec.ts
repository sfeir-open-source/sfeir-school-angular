import { DebugElement } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PEOPLE_MOCK } from '@sfeir/types';
import { Card } from '@sfeir/ui/card';
import { Loader } from '@sfeir/ui/loader';
import { fireEvent, render, screen } from '@testing-library/angular';
import { People } from '../../core/provider/people';
import { Home } from './home';

const PERSON_RESOURCE_STUB = {
  isLoading: vi.fn(() => false),
  hasValue: vi.fn(() => true),
  value: vi.fn(() => PEOPLE_MOCK[1]),
  reload: vi.fn(),
};

const MOCK_PEOPLE_SERVICE = {
  getRandomPerson: vi.fn(() => PERSON_RESOURCE_STUB),
};

describe('Home', () => {
  let component: Home;
  let container: HTMLElement;
  let debugElement: DebugElement;

  beforeEach(async () => {
    vi.clearAllMocks();
    const {
      fixture,
      container: containerFromRender,
      debugElement: debugElementFromRender,
    } = await render(Home, {
      providers: [
        {
          provide: People,
          useValue: MOCK_PEOPLE_SERVICE,
        },
      ],
    });
    container = containerFromRender;
    component = fixture.componentInstance;
    debugElement = debugElementFromRender;
  });

  describe('Instance', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
    it('should create an instance of Home', () => {
      expect(component).toBeInstanceOf(Home);
    });
  });
  describe('Template', () => {
    it('should display the sfeir card component', () => {
      const sfeirCardElement = container.getElementsByTagName('sfeir-card');
      expect(sfeirCardElement.length).toBe(1);
    });
    it('should pass the person to the sfeir card component input', () => {
      const sfeirCardElement = debugElement.query(By.directive(Card));
      expect(sfeirCardElement).toBeTruthy();
      expect(sfeirCardElement.componentInstance.person()).toEqual(PEOPLE_MOCK[1]);
    });
    it('should call the method handleRefresh when the delete event is emitted', () => {
      const spy = vi.spyOn(component, 'handleRefresh');
      debugElement.query(By.directive(Card)).triggerEventHandler('delete', PEOPLE_MOCK[1].id);
      expect(spy).toHaveBeenCalledOnce();
    });
    it('should call the method handleRefresh when the button random is clicked', () => {
      const spy = vi.spyOn(component, 'handleRefresh');
      const refreshButton = screen.getByTestId('refresh-button');
      fireEvent.click(refreshButton);
      expect(spy).toHaveBeenCalledOnce();
    });
    it('should reload the person resource when the button random is clicked', () => {
      const refreshButton = screen.getByTestId('refresh-button');
      fireEvent.click(refreshButton);
      expect(PERSON_RESOURCE_STUB.reload).toHaveBeenCalledOnce();
    });
    it('should display the loader while the person resource is loading', async () => {
      TestBed.resetTestingModule();
      const loadingPersonResourceStub = {
        isLoading: vi.fn(() => true),
        hasValue: vi.fn(() => false),
        value: vi.fn(() => undefined),
        reload: vi.fn(),
      };
      const { debugElement: loadingDebugElement } = await render(Home, {
        providers: [
          {
            provide: People,
            useValue: { getRandomPerson: vi.fn(() => loadingPersonResourceStub) },
          },
        ],
      });
      expect(loadingDebugElement.query(By.directive(Loader))).not.toBeNull();
      expect(loadingDebugElement.query(By.directive(Card))).toBeNull();
    });
  });
});
