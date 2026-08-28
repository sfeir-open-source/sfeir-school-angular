import { Component, inputBinding } from '@angular/core';
import { render } from '@testing-library/angular';
import { Loader } from './loader';

@Component({
  template: `<sfeir-loader [isLoading]="isLoading"><p data-testid="projected">Projected content</p></sfeir-loader>`,
  imports: [Loader],
})
class LoaderHost {
  isLoading = true;
}

describe('Loader', () => {
  describe('Instance', () => {
    it('should create the component', async () => {
      const { fixture } = await render(Loader);
      expect(fixture.componentInstance).toBeInstanceOf(Loader);
    });
    it('should default isLoading to true', async () => {
      const { fixture } = await render(Loader);
      expect(fixture.componentInstance.isLoading()).toBe(true);
    });
  });

  describe('Template', () => {
    it('should render the animated circle when isLoading is true', async () => {
      await render(Loader, { bindings: [inputBinding('isLoading', () => true)] });
      expect(document.querySelector('svg.circular circle.path')).toBeInTheDocument();
    });
    it('should not render the animated circle when isLoading is false', async () => {
      await render(Loader, { bindings: [inputBinding('isLoading', () => false)] });
      expect(document.querySelector('svg.circular circle.path')).not.toBeInTheDocument();
    });
    it('should project the content passed via ng-content', async () => {
      const { container } = await render(LoaderHost);
      expect(container.querySelector('[data-testid="projected"]')).toHaveTextContent('Projected content');
    });
    it('should keep projecting the content whether isLoading is true or false', async () => {
      const { container, fixture } = await render(LoaderHost);
      fixture.componentInstance.isLoading = false;
      fixture.detectChanges();
      expect(container.querySelector('[data-testid="projected"]')).toHaveTextContent('Projected content');
    });
  });
});
