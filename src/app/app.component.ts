import { Component, OnInit } from '@angular/core';
import { Task } from './task.model';
import { Observable } from 'rxjs';
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

  project: Observable<Project>;
  title = 'miniburn';
  lists = ["To do", "Done"]
  tasks: Task[];

  constructor(private store: Store<AppState>) {
  }

  ngOnInit() {
    this.project = this.store.select("project");
  }

  switchState(task: Task, status: string) {
    this.tasks.filter((obj)=>{
      return obj === task;
    })
  }

  checkStatus(value: string) {
    return status == value;
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
