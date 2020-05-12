import { Component, OnInit, Input } from '@angular/core';
import { PopUpWindowStructure } from 'src/app/models/popup-window-structure.model';
import { AppState } from 'src/app/store/appstate';
import { Store } from '@ngrx/store';
import * as ProjectActions from '../../store/actions/project.actions';

@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.css']
})
export class PopupWindowComponent implements OnInit {

  @Input() popupStructure: PopUpWindowStructure;

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
  }

  closePopup() {
    this.store.dispatch(new ProjectActions.OpenPopup(""));
  }

}
