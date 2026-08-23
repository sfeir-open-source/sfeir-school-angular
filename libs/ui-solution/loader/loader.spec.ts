import { render } from '@testing-library/angular';
import { Loader } from './loader';

describe('Loader', () => {
  describe('Instance', () => {
    it('should create the component', async () => {
      const { fixture } = await render(Loader);
      expect(fixture.componentInstance).toBeInstanceOf(Loader);
    });
  });

  describe('Template', () => {
    it('should render the animated circle', async () => {
      await render(Loader);
      expect(document.querySelector('svg.circular circle.path')).toBeInTheDocument();
    });
  });
});
