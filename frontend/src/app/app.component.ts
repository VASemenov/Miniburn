import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Project } from './modules/tasks/project.model';

interface AppState {
  project: Project;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  project: Project;

  // TODO: will be removed to the server side
  isAuthorized = true;

  constructor(private store: Store<AppState>) {
    this.store.subscribe((state) => (this.project = state.project));
  }

  ngOnInit() {}
}
