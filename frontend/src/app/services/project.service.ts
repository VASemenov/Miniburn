import { Injectable, Inject } from "@angular/core";
import { API } from "./api/api.service"
import { HttpClient } from '@angular/common/http';
import { APIModes } from './api/enums/modes.enum';
import { IProject } from '../models/project.model';


@Injectable()
export class ProjectService {
  constructor(
    @Inject(HttpClient) private http: HttpClient,
    private api: API
  ) {}

  public create(project: IProject) {
    this.http.post(this.api.PROJECTS(APIModes.CREATE), project)
  }

  public read(id: string) {
    let body = {
      _id: id
    }

    this.http.post(this.api.PROJECTS(APIModes.READ), body)
  }

  public update(id:string, changes: Object) {
    let body = {
      _id: id,
      name: "API Created Project",
    }

    this.http.post(this.api.PROJECTS(APIModes.UPDATE), body)
  }

  public delete(id: string) {
    let body = {
      _id: id
    }

    this.http.post(this.api.PROJECTS(APIModes.DELETE), body)
  }

}

