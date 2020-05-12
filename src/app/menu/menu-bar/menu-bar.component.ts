import { Component, OnInit, ElementRef } from '@angular/core';

@Component({
  selector: 'app-menu-bar',
  templateUrl: './menu-bar.component.html',
  styleUrls: ['./menu-bar.component.css'],
  host: {
    '(document:click)': 'onClick($event)',
  },
})
export class MenuBarComponent implements OnInit {
  padOpened: boolean = false;
  constructor(private _eref: ElementRef) { }

  ngOnInit(): void {
  }

  switchPad() {
    this.padOpened = !this.padOpened;
  }

  onClick(event) {
    if (!this._eref.nativeElement.contains(event.target)) // or some similar check
      this.padOpened = false;
   }

}
