import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Project } from '../project.model';
import * as ProjectActions from '../../../store/actions/project.actions';
import { AppState } from '../../../store/appstate';
import { Observable, Subscription } from 'rxjs';
import { TaskService } from '../../../services/task/task.service';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css'],
})
export class TaskCardComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private taskService: TaskService
  ) {}

  oid$: Subscription;
  oid: string;

  idRef: number;
  @Input() set id(value: number) {
    this.idRef = value;
    this.oid$ = this.store.subscribe(
      (state) => (this.oid = state.project.tasks[value]._id)
    );
  }
  get id(): number {
    return this.idRef;
  }
  @Input() taskText: string;
  @Input() status: string;

  project$: Observable<Project>;
  proj: Project;

  editModeOn = false;
  @Input() set editMode(value: number) {
    this.editModeOn = value === this.id;
    if (this.editModeOn) {
      this.editTask();
    }
  }

  @ViewChild('textInput') input: ElementRef;

  ngOnInit(): void {}

  checkEditable(editableId: number) {
    if (this.id === editableId) {
      this.editTask();
    }
  }

  onTextClick() {
    this.store.dispatch(new ProjectActions.EditTask(this.id));
  }

  editTask() {
    setTimeout(() => {
      // this will make the execution after the above boolean has changed
      this.input?.nativeElement.focus();
    }, 0);
  }

  saveChanges() {
    this.editModeOn = false;
    this.taskText = this.input.nativeElement.value;
    this.store.dispatch(
      new ProjectActions.SaveTask({
        id: this.id,
        text: this.taskText,
      })
    );
    this.taskService.update(this.oid, { text: this.taskText }).subscribe();
  }

  check() {
    const updatedStatus = this.status === 'To do' ? 'Done' : 'To do';
    this.store.dispatch(
      new ProjectActions.CheckTask({
        id: this.id,
        status: updatedStatus,
      })
    );
    this.taskService.update(this.oid, { status: updatedStatus }).subscribe();
  }

  delete() {
    this.oid$.unsubscribe();
    this.store.dispatch(new ProjectActions.DeleteTask(this.id));
    this.taskService.update(this.oid, { deleted: true }).subscribe();
  }
}
