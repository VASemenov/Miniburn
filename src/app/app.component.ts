import { Component, OnInit } from '@angular/core';
import { Task } from './models/task.model';
import { Store } from '@ngrx/store';
import { Project } from './tasks/project.model';

interface AppState {
  project: Project;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  project: Project;

  // TODO: will be removed to the server side
  isAuthorized: boolean = true;

  constructor(private store: Store<AppState>) {
    this.store.subscribe(state => this.project = state.project)
  }

  ngOnInit() {
  }


  // getTasksByID(id: number) {
  //   return this.tasks.find((obj) => {
  //     return obj.id === id;
  //   })
  // }

  // moveTask(id: number) {
  //   let task = this.getTasksByID(id);
  //   task.status = task.status == "To do" ? "Done" : "To do";

  //   console.log(this.tasks);
  // }

  // createTask() {
  //   let newTask = {
  //     id: this.tasks.length,
  //     text: "",
  //     status: "To do"}

  //   this.tasks.push(newTask);
  // }
}
