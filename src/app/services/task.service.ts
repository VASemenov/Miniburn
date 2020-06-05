import { Injectable, Inject } from "@angular/core";
import { API } from "./api/api.service"
import { HttpClient } from '@angular/common/http';
import { APIModes } from './api/enums/modes.enum';
import { IProject } from '../models/project.model';
import { Task } from '../models/task.model';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(
    @Inject(HttpClient) private http: HttpClient,
    private api: API
  ) {}

  public create(task: Task) {
    this.http.post(this.api.TASKS(APIModes.CREATE), task)
  }

  public read(id: string) {
    let body = {
      _id: id
    }

    this.http.post(this.api.TASKS(APIModes.READ), body)
  }

  public update(id:string, changes: Object) {
    let body = {
      _id: id,
      name: "API Created Project",
    }

    this.http.post(this.api.TASKS(APIModes.UPDATE), body)
  }

  public delete(id: string) {
    let body = {
      _id: id
    }

    this.http.post(this.api.TASKS(APIModes.DELETE), body)
  }

}

