import { render } from '@testing-library/angular';
import { App } from './app';

describe('App', () => {
  let component: App;
  let container: HTMLElement;

  beforeEach(async () => {
    const { fixture, container: containerFromRender } = await render(App);
    component = fixture.componentInstance;
    container = containerFromRender;
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
    it('should have the element sfeir-home', () => {
      const sfeirHomeElement = container.getElementsByTagName('sfeir-home');
      expect(sfeirHomeElement.length).toBe(1);
    });
  });
});
