import { Injectable, Inject } from "@angular/core";
import { API } from "./api/api.service"
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { APIModes } from './api/enums/modes.enum';
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
    return this.http.post(this.api.TASKS(APIModes.CREATE), task)
  }

  public read(id: string) {
    let body = {
      "_id": id
    }

    return this.http.post(this.api.TASKS(APIModes.READ), body)
  }

  public filter(filter: Object) {
    return this.http.post<any>(this.api.TASKS(APIModes.READ), filter);
  }

  public update(id:string, changes: Object) {
    console.log(id)
    let body = {
      "_id": id,
      ...changes
    }
    console.log("REQUEST")
    console.log(body)
    return this.http.post(this.api.TASKS(APIModes.UPDATE), body, {responseType: 'text'})
  }

  public delete(id: string) {
    let body = {
      "_id": id
    }

    return this.http.post(this.api.TASKS(APIModes.DELETE), body, {responseType: 'text'})
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

