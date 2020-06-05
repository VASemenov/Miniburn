import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class API {

  // TODO: Move to environment
  private env = "dev"

  private endpointEnvs = {
    dev: "http://127.0.0.1:5000/api/",
    prod: ""
  }

  private endpoint:string;

  constructor() {
    // TODO: Get env from environment
    this.initEndpoints("dev");
  }

  public MAIN() {
    return this.endpoint
  }

  public PROJECTS(mode: string = "") {
    return this.MAIN + "projects/" + mode
  }

  public TASKS(mode: string = "") {
    return this.MAIN + "tasks/" + mode
  }

  private initEndpoints(env: string) {
    this.endpoint = this.endpointEnvs[this.env]
  }

}
