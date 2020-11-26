import { Directive, ElementRef, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: 'sfeir-card-subtitle'
})
export class CardSubtitleDirective implements OnInit {
  constructor(private readonly elementRef: ElementRef<CardSubtitleDirective>, private readonly renderer: Renderer2) {}

  ngOnInit(): void {
    this.renderer.addClass(this.elementRef.nativeElement, 'text-xl');
  }
}
