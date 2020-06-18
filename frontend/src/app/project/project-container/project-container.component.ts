import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/tasks/project.model';
import { Task } from 'src/app/models/task.model';
import { AppState } from 'src/app/store/appstate';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.css']
})
export class ProjectContainerComponent implements OnInit {

  project: Project;
  title = 'miniburn';
  lists = ["To do", "Done"]
  tasks: Task[];

  constructor(private store: Store<AppState>) {
    this.store.subscribe(state => this.project = state.project)
  }

  ngOnInit() {
  }

  switchState(task: Task, status: string) {
    this.tasks.filter((obj)=>{
      return obj === task;
    })
  }

  checkStatus(value: string) {
    return status == value;
  }
}
