import { render, screen } from '@testing-library/angular';
import { App } from './app';

describe('App', () => {
  let component: App;

  beforeEach(async () => {
    const { fixture } = await render(App);
    component = fixture.componentInstance;
  });

  describe('Instance', () => {
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });
    it('should create an instance of App', () => {
      expect(component).toBeInstanceOf(App);
    });
  });
  describe('Template', () => {
    it('should display the name', () => {
      expect(screen.getByText('SFEIR_SCHOOL')).toBeInTheDocument();
    });
  });
});
