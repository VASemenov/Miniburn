import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appstate';
import { Observable } from 'rxjs';
import { Project } from '../project.model';
import * as ProjectActions from '../../store/actions/project.actions';



@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
  }

  createTask() {
    this.store.dispatch(new ProjectActions.CreateNew());
  }

}
