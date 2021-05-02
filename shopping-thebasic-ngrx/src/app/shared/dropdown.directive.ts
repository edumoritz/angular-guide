import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({ selector: '[appDropdown]' })
export class DropDownDirective {
  @HostBinding('class.open') isOpen = false;

  //Fecha dropdown clicando no botão
  // @HostListener('click') toggleOpen() {
  //   this.isOpen = !this.isOpen;
  // }

  //Fecha dropdown clicando em qualquer outra parte da tela
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }

  constructor(private elRef: ElementRef) {}
}
