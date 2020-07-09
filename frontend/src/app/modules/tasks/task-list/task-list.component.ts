import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '../../../models/task.model';
import { Project } from '../project.model';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TaskService } from '../../../services/task/task.service';
import * as ProjectActions from '../../../store/actions/project.actions';

interface AppState {
  project: Project;
}

export const selectFeature = createFeatureSelector<AppState, Project>(
  'project'
);

export const selectTasks = createSelector(
  selectFeature,
  (state: Project) => state.tasks
);

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private taskService: TaskService
  ) {
    this.taskService.filter({ project: 'A10000' }).subscribe((data) => {
      this.store.dispatch(new ProjectActions.UpdateTaskList(data));
    });
    this.store.subscribe((state) => {
      this.tasks = state.project.tasks;
    });

    this.store.subscribe(
      (state) => (this.editableId = state.project.editModeId)
    );
  }
  @Input() name: string; // same as status

  project$: Observable<Project>;
  tasks: { [taskId: number]: Task };
  editableId: number;

  @Output() Check = new EventEmitter<number>();

  @Output() Create = new EventEmitter();

  isEmpty(): boolean {
    return (
      this.tasks !== undefined &&
      Object.values(this.tasks).filter((task) => task.status === this.name)
        .length === 0
    );
  }

  ngOnInit(): void {}

  setName(value: string) {
    this.name = value;
  }
  check(id: number) {
    this.Check.emit(id);
  }
  create() {
    this.Create.emit();
  }

  statusCheck(task: Task) {
    return task.status === this.name && !task.deleted;
  }

  editableIdCheck(id: number) {
    return id === this.editableId;
  }
}
