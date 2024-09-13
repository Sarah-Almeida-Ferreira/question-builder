import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAutoResizeTextarea]',
  standalone: true
})
export class AutoResizeTextareaDirective {
  constructor(private el: ElementRef) {}

  @HostListener('input')
  resize() {
    const inputElement: HTMLInputElement = this.el.nativeElement;
    inputElement.style.height = 'auto';
    inputElement.style.height = inputElement.scrollHeight + 'px';
  }
}
