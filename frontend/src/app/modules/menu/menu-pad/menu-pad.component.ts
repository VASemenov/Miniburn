import { Component, OnInit, ElementRef, Output, EventEmitter } from '@angular/core';
import { AppState } from 'src/app/store/appstate';
import { Store } from '@ngrx/store';
import * as ProjectActions from 'src/app/store/actions/project.actions';

@Component({
  selector: 'app-menu-pad',
  templateUrl: './menu-pad.component.html',
  styleUrls: ['./menu-pad.component.css'],
})
export class MenuPadComponent implements OnInit {

  constructor(private store:Store<AppState>) { }

  ngOnInit(): void {
  }

  openPopup(name:string) {
    this.store.dispatch(new ProjectActions.OpenPopup("EditProject"));
  }

}
