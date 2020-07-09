import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-drop-down',
  templateUrl: './drop-down.component.html',
  styleUrls: ['./drop-down.component.css'],
})
export class DropDownComponent implements OnInit {
  @Input() opened = false;
  @Input() target: HTMLDivElement;
  targetDisplayStyle: string;

  constructor() {}

  ngOnInit(): void {
    if (this.opened) {
      this.showElement();
    } else {
      this.hideElement();
    }
  }

  switchState() {
    this.opened = !this.opened;

    if (!this.opened) {
      this.hideElement();
    } else {
      this.showElement();
    }
  }

  assignTarget(element: HTMLDivElement) {
    this.target = element;
    this.targetDisplayStyle = this.target.style.display;
  }

  hideElement() {
    // this.target.style.visibility = 'collapse';
    this.target.style.display = 'none';
  }

  showElement() {
    this.target.style.display = '';
  }
}
