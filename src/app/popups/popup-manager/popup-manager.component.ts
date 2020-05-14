import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/appstate';
import { Project } from 'src/app/tasks/project.model';
import { InputField } from 'src/app/models/input-field.model';
import * as ProjectActions from '../../store/actions/project.actions';

@Component({
  selector: 'app-popup-manager',
  templateUrl: './popup-manager.component.html',
  styleUrls: ['./popup-manager.component.css']
})
export class PopupManagerComponent implements OnInit {

  private _project:Project;
  set project(value: Project) {
    this._project = value;
    if (this._project) {
      this.popupStructures["EditProject"] = {
          name: "Edit Project",
          inputs: [
            {
              name: "Project name",
              type: "text",
              value: this._project.name,
              storeReference: "name",
              action: ""
            },
            {
              name: "Project goal",
              type: "text",
              value: this._project.goal,
              storeReference: "goal",
              action: ""
            },
            {
              name: "Start time",
              type: "datetime",
              value: this._project.startDate.toLocaleString(),
              storeReference: "startDate",
              action: ""
            },
            {
              name: "Deadline",
              type: "datetime",
              value: this._project.endDate.toLocaleString(),
              storeReference: "endDate",
              action: ""
            }
          ]
        }
    }

  }

  constructor(private store:Store<AppState>) {
    this.store.subscribe(state => this.chosenStructure = state.project.popupOpened)
    this.store.subscribe(state => this.project = state.project);
  }

  popupOpened:boolean = false;
  private _chosenStructure:string = ""
  set chosenStructure(value:string) {
    this._chosenStructure = value;
    if (value === "") {
      this.popupOpened = false;
    } else {
      this.popupOpened = true;
    }
  };

  get chosenStructure(): string {
    return this._chosenStructure;
  }

  popupStructures = {
    "EditProject": {
      name: "Edit Project",
      inputs: [
        {
          name: "Project name",
          type: "text",
          value: undefined,
          storeReference: "name",
          action: undefined
        },
        {
          name: "Deadline",
          type: "datetime",
          value: undefined,
          storeReference: "endDate",
          action: undefined
        },
        {
          name: "Reset start time",
          type: "button",
          value: undefined,
          storeReference: '',
          action: undefined
        }
      ]
    }
  }

  ngOnInit(): void {
  }

  getProjectStructure(name:string) {
    return this.popupStructures[name];
  }

}
