import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[xlHighlightFormControl]'
})

export class HighlightFormControlDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('focus') onMouseFocus() {
    this.highlight();
  }

  @HostListener('blur') onMouseBlur() {
    this.highlight(null);
  }

  @HostListener('keyup') onKeyUp() {
    this.highlight();
  }

  @HostListener('keydown') onKeyDown() {
    this.highlight();
  }

  private highlight(ok: boolean=true) {
    const ne = this.el.nativeElement;
    const parentEle = ne.closest('.xl__input-group');

    setTimeout(() => {
      if((ne.classList.contains('ng-invalid') && ne.classList.contains('ng-dirty') || ne.classList.contains('ng-touched') )) {
        // console.log('add state-error')
        parentEle.classList.add('state--error');
      }
      else {
        // console.log('remove state-error')
        parentEle.classList.remove('state--error');
      }

      if(ne.classList.contains('ng-valid') ) {
        // console.log('remove on ng-valid class state-error')
        parentEle.classList.remove('state--error');
      }
    }, 0);

    if (ok) {
      parentEle.classList.add('focused');
    } else {
      parentEle.classList.remove('focused');
    }
    
  }

}
