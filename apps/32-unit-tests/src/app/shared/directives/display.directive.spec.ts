/* eslint-disable @angular-eslint/component-class-suffix */
import { Component } from '@angular/core';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { DisplayDirective } from './display.directive';

@Component({
  template: ``,
})
export class HostSfeirDisplayDirective {
  condition = true;
}

const overrideTemplateComponent = (template: string) =>
  TestBed.overrideComponent(HostSfeirDisplayDirective, { set: { template } }).createComponent(HostSfeirDisplayDirective);

describe('SfeirDisplayDirective', () => {
  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HostSfeirDisplayDirective, DisplayDirective],
    }).compileComponents();
  }));

  it('should create an instante of HostSfeirDisplayDirective', () => {
    const fixture = overrideTemplateComponent(`<div>Hello</div>`);
    const component = fixture.componentInstance;
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should not display the div if condition is false', () => {
    /**TODO:
     * 1. Créez une fixture de la même manière que ci-dessus en précisant que la sfeirDisplay=false
     * 2. Récupérez le debugElement dans une constante le debugElement de votre fixture
     * 3. Récupérez la div ou se place la directive sfeirDisplay grâce au debugElement
     * 4: Vérifiez que la div n'est pas affiché
     */
  });

  it('should display the div if condition is true', () => {
    /**TODO:
     * 1. Créez une fixture de la même manière que ci-dessus en précisant la directive sfeirDisplay=true
     * 2. Récupérez le debugElement dans une constante le debugElement de votre fixture
     * 3. Récupérez la div ou se place la directive sfeirDisplay grâce au debugElement
     * 4: Vérifiez que la div est bien affiché
     */
  });

  it('should reevaluate the condition if change', () => {
    /**TODO:
     * A l'aide des dux premiers tests, réalisez un test qui permet que vérifier que si la condition change de truc à false, alors la div disparaît
     */
  });
});
