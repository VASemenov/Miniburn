import { Component, OnInit, Input, Output, ViewChildren } from '@angular/core';
import { PopUpWindowStructure } from '../../../../models/popup-window-structure.model';
import { AppState } from '../../../../store/appstate';
import { Store } from '@ngrx/store';
import * as ProjectActions from '../../../../store/actions/project.actions';
import { InputField } from '../../../../models/input-field.model';

@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.css'],
})
export class PopupWindowComponent implements OnInit {
  @Input() popupStructure: PopUpWindowStructure;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {}

  closePopup() {
    this.store.dispatch(new ProjectActions.OpenPopup(''));
  }

  buildPayload(storeReferencePass: string, valuePass: any) {
    const input: InputField = {
      storeReference: storeReferencePass,
      value: valuePass,
      name: '',
      type: '',
      action: '',
    };
    return input;
  }

  saveField(event, input: InputField) {
    this.store.dispatch(
      new ProjectActions.SaveField(
        this.buildPayload(input.storeReference, event.target.value)
      )
    );
  }

  buttonAction(action: any) {
    /* tslint:disable-next-line */
    new action();
  }
}
