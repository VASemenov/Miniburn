import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.model';
import { Project } from '../project.model';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TaskList } from 'src/app/models/task-list.model';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { TaskService } from 'src/app/services/task.service';
import * as fromRoot from '../../store/reducers/project.reducer'

interface AppState {
  project: Project;
}

export const selectFeature = createFeatureSelector<AppState, Project>("project");

export const selectTasks = createSelector(
  selectFeature,
  (state: Project) => state.tasks
);

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  @Input() name: string; // same as status

  project$: Observable<Project>;
  tasks:{[taskId:number] : Task};
  editableId: number;

  constructor(
    private store: Store<AppState>,
    private taskService: TaskService) {
    this.store.subscribe(state => this.tasks = state.project.tasks);
    this.store.subscribe(state => this.editableId = state.project.editModeId);
  }

  isEmpty():boolean {
    return this.tasks != undefined && Object.values(this.tasks).filter((task) => task.status == this.name).length == 0;
  }

  ngOnInit(): void {
    // this.store.subscribe(state => this.tasks = state.project.tasks);
  }

  setName(value: string) {
    this.name = value;
  }

  @Output() onCheck = new EventEmitter<number>();
  check(id: number) {
    this.onCheck.emit(id);
  }

  @Output() onCreate = new EventEmitter();
  create() {
    this.onCreate.emit();
  }

  statusCheck(status: string) {
    return status == this.name;
  }

  editableIdCheck(id: number) {
    return (id == this.editableId);
  }

}
