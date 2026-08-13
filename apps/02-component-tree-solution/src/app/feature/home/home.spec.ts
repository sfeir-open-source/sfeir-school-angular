import { render, screen } from '@testing-library/angular';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let container: HTMLElement;

  beforeEach(async () => {
    const { fixture, container: containerFromRender } = await render(Home);
    container = containerFromRender;
    component = fixture.componentInstance;
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
    it('should have the element mat-card', () => {
      const matCardElement = container.getElementsByTagName('mat-card');
      expect(matCardElement.length).toBe(1);
    });
    it('should display the name', () => {
      expect(screen.getByText('SFEIR_SCHOOL')).toBeInTheDocument();
    });
  });
});
