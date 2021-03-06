import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/appstate';
import * as ProjectActions from '../../../store/actions/project.actions';
import { TaskService } from '../../../services/task/task.service';
import { Task } from 'frontend/src/app/models/task.model';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css'],
})
export class TaskCreateComponent implements OnInit {
  constructor(private store: Store<AppState>, private tasks: TaskService) {}

  ngOnInit(): void {}

  createTask() {
    this.tasks
      .create({
        text: '',
        status: 'To do',
        done: false,
        weight: 1,
        project: 'A10000',
        deleted: false,
      })
      .subscribe((data: Task) =>
        this.store.dispatch(new ProjectActions.CreateNew(data._id))
      );
  }
}
