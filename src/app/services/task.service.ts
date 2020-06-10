import { Injectable, Inject } from "@angular/core";
import { API } from "./api/api.service"
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  ) {
  }

  public create(task: Task) {
    this.http.post(this.api.TASKS(APIModes.CREATE), this.pack(task))
  }

  public read(id: string) {
    let body = [{
      "_id": id
    }]

    return this.http.post(this.api.TASKS(APIModes.READ), this.pack(body))
  }

  public filter(filter: Object) {
    return this.http.post<any>(this.api.TASKS(APIModes.READ), filter);
  }

  public update(id:string, changes: Object) {
    let body = [{
      "_id": id,
      "name": "API Created Project",
    }]

    this.http.post(this.api.TASKS(APIModes.UPDATE), this.pack(body))
  }

  public delete(id: string) {
    let body = [{
      "_id": id
    }]

    this.http.post(this.api.TASKS(APIModes.DELETE), this.pack(body))
  }

  private pack(body: Object) {
    return JSON.stringify(body);
  }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders()
    headers.set('Content-Type', 'application/json; charset=utf-8')
    return headers
  }

}

