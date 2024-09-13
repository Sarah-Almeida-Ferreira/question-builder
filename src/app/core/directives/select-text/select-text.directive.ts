import { Directive, HostListener, ElementRef } from '@angular/core';

@Directive({
  standalone: true,
  selector: '[appSelectText]',
})
export class SelectTextDirective {
  constructor(private el: ElementRef) {}

  @HostListener('focus')
  onClickOrFocus() {
    const inputElement: HTMLInputElement = this.el.nativeElement;
    inputElement.select();
  }
}
