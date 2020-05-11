import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project } from '../project.model';
import { ProjectReducer } from 'src/app/store/reducers/project.reducer';
import * as ProjectActions from '../../store/actions/project.actions';
import { AppState } from 'src/app/store/appstate';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  _id:number;
  @Input() set id(value:number) {
    this._id = value;
  }
  get id():number {
    return this._id
  }
  @Input() taskText: string;
  @Input() status: string;

  project$: Observable<Project>;
  proj: Project;

  editModeOn: boolean = false;
  @Input() set editMode(value: number) {
    this.editModeOn = (value == this.id);
    if (this.editModeOn) this.editTask();
  }

  @ViewChild("textInput") input: ElementRef;

  ngOnInit(): void {
    // if (this.status == "To do") {
    //   this.editTask();
    // }
  }

  checkEditable(editableId: number) {
    if (this.id == editableId) {
      this.editTask();
    }
  }

  onTextClick() {
    this.store.dispatch(new ProjectActions.EditTask(this.id));
  }


  editTask() {
    setTimeout( ()=> { // this will make the execution after the above boolean has changed
      this.input?.nativeElement.focus();
    },0);

  }

  saveChanges() {
    this.editModeOn = false;
    this.taskText = this.input.nativeElement.value;
    this.store.dispatch(new ProjectActions.SaveTask({
      id: this.id,
      text: this.taskText}));
  }

  check() {
    this.store.dispatch(new ProjectActions.CheckTask({
      id: this.id,
      status: this.status == "To do" ? "Done" : "To do"
    }));
  }

}
