import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { IconSecretComponent } from './icon-secret/icon-secret.component';

@Directive({
  selector: '[sfeirSecret]'
})
export class SecretDirective implements OnInit {
  constructor(
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly templateRef: TemplateRef<any>,
    private readonly viewContainerRef: ViewContainerRef
  ) {}

  ngOnInit(): void {
    const iconComponentFactory: ComponentFactory<IconSecretComponent> = this.componentFactoryResolver.resolveComponentFactory(
      IconSecretComponent
    );
    const iconComponent: ComponentRef<IconSecretComponent> = this.viewContainerRef.createComponent(
      iconComponentFactory
    );
    iconComponent.instance.template = this.templateRef;
  }
}
