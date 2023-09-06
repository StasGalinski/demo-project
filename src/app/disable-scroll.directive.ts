import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appDisableScroll]',
})
export class DisableScrollDirective implements OnInit {
  @Input() appDisableScroll: boolean;
  constructor(private el: ElementRef, private renderer: Renderer2) {}
  ngOnInit(): void {
    if (!this.appDisableScroll) {
      this.renderer.removeStyle(document.body, 'overflow');
    } else {
      this.renderer.setStyle(document.body, 'overflow', 'hidden');
      console.log('removed')
    }
  }
}
