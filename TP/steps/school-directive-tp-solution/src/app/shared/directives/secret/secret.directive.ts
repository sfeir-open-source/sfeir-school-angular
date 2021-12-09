import { ComponentRef, Directive, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { IconSecretComponent } from './icon-secret/icon-secret.component';

@Directive({
  selector: '[sfeirSecret]'
})
export class SecretDirective implements OnInit {
  constructor(private readonly templateRef: TemplateRef<any>, private readonly viewContainerRef: ViewContainerRef) {}

  ngOnInit(): void {
    const iconComponent: ComponentRef<IconSecretComponent> = this.viewContainerRef.createComponent(IconSecretComponent);
    iconComponent.instance.template = this.templateRef;
  }
}
