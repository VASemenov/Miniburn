import { Component, OnInit, Input, Output, ViewChildren } from '@angular/core';
import { PopUpWindowStructure } from 'src/app/models/popup-window-structure.model';
import { AppState } from 'src/app/store/appstate';
import { Store, Action } from '@ngrx/store';
import * as ProjectActions from '../../store/actions/project.actions';
import { InputField } from 'src/app/models/input-field.model';


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

  buildPayload(_storeReference: string, _value: any) {
    let input:InputField = {
      storeReference: _storeReference,
      value: _value,
      name: "",
      type: "",
      action: ""
    };
    return input;
  }

  saveField(event, input: InputField) {
    // input.value = newValue;
    // console.log(event.target.value);
    this.store.dispatch(
      new ProjectActions.SaveField(
        this.buildPayload(
          input.storeReference,
          event.target.value)
      )
    );
  }

  buttonAction(action) {
    new action();
  }

  // testInput(event) {
  //   console.log(event.target.value);
  // }

}
