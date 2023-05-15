import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostListener,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[app-tooltip-directive]',
})
export class ShowTooltipDirective implements AfterViewInit {
  element: any;
  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.element = this.elementRef.nativeElement;
    const style = {
      'text-overflow': 'ellipsis',
      overflow: 'hidden',
      'white-space': 'nowrap',
    };
    Object.keys(style).forEach((element) => {
      this.renderer.setStyle(this.element, `${element}`, style[element]);
    });
  }
  ngAfterViewInit(): void {
    this.renderer.setProperty(this.element, 'scrollTop', 1);
    this.setToolTip();
  }
  @HostListener('window:resize', ['$event.target'])
  setToolTip() {
    this.element.offsetWidth < this.element.scrollWidth
      ? this.renderer.setAttribute(
          this.element,
          'title',
          this.element.textContent
        )
      : this.renderer.removeAttribute(this.element, 'title');
  }
}
