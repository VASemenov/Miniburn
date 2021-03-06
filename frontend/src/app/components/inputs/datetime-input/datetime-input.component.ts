import { Component, OnInit, Input } from '@angular/core';
import { InputField } from '../../../models/input-field.model';
import * as moment from 'moment';
import { AppState } from '../../../store/appstate';
import { Store } from '@ngrx/store';
import * as ProjectActions from '../../../store/actions/project.actions';
import { Project } from '../../../modules/tasks/project.model';

@Component({
  selector: 'app-datetime-input',
  templateUrl: './datetime-input.component.html',
  styleUrls: ['./datetime-input.component.css'],
})
export class DatetimeInputComponent implements OnInit {
  constructor(private store: Store<AppState>) {
    this.store.subscribe((state) => (this.project = state.project));
  }

  @Input() input: InputField;
  @Input() complete: () => void;
  @Input() argument: InputField;

  moment: moment.Moment;

  date: string;
  time: string;

  dateReference: HTMLInputElement;
  timeReference: HTMLInputElement;

  actualDateString: string;

  dateState = 0;
  timeState = 0;

  project: Project;

  getDate() {
    return this.date;
  }

  getTime() {
    return this.time;
  }

  ngOnInit(): void {
    this.updateInput();
  }

  updateInput() {
    this.moment = moment(this.input.value, 'DD.MM.YYYY, HH:mm:SS');
    this.date = this.moment.format('DD/MM/YY');
    this.time = this.moment.format('HH:mm');
  }

  buildPayload(storeReference: string, value: any) {
    const input: InputField = {
      storeReference,
      value,
      name: '',
      type: '',
      action: '',
    };
    return input;
  }

  buildDate() {
    const actualDateString = this.date + '-' + this.time;
    return moment(actualDateString, 'DD/MM/YY-HH:mm').toDate();
  }

  onComplete() {
    this.store.dispatch(
      new ProjectActions.SaveField(
        this.buildPayload(this.input.storeReference, this.buildDate())
      )
    );
  }

  refineDateInput(date: HTMLInputElement, time: HTMLInputElement) {
    this.dateReference = date;
    this.timeReference = time;
    const len: number = date.value.length;
    const str: string = date.value;
    const lastSymbol: string = str.substr(str.length - 1);

    if (!lastSymbol.match('^[0-9]*$')) {
      date.value = str.slice(0, -1);
    }

    if (len === 2 && this.dateState === 0) {
      date.value += '/';
      this.dateState += 1;
    } else if (len === 2 && this.dateState > 0) {
      this.dateState -= 1;
      date.value = str.slice(0, -1);
    }
    if (len === 5 && this.dateState === 1) {
      date.value += '/';
      this.dateState += 1;
    } else if (len === 5 && this.dateState === 2) {
      this.dateState -= 1;
      date.value = str.slice(0, -1);
    }
    if (len === 8) {
      date.placeholder = date.value;
      this.date = date.value;
      time.focus();
    }
  }

  isValidDate(): boolean {
    if (
      this.date.match('^(0?[1-9]|[12][0-9]|3[01])[/-](0?[1-9]|1[012])[/-]d{4}$')
    ) {
      return true;
    }
    return false;
  }

  isValidTime(): boolean {
    if (this.date.match('^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$')) {
      return true;
    }
    return false;
  }

  refineTimeInput(date: HTMLInputElement, time: HTMLInputElement) {
    this.dateReference = date;
    this.timeReference = time;
    const len = time.value.length;
    if (len === 2 && this.timeState === 0) {
      time.value += ':';
      this.timeState += 1;
    } else if (len === 2 && this.timeState > 0) {
      time.value = time.value.slice(0, -1);
      this.timeState -= 1;
    }

    if (len === 5) {
      this.time = time.value;
      this.onComplete();
    }
  }
}
