import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../store/appstate';
import { Project } from '../../../tasks/project.model';
import { InputField } from '../../../../models/input-field.model';
import * as ProjectActions from '../../../../store/actions/project.actions';

@Component({
  selector: 'app-popup-manager',
  templateUrl: './popup-manager.component.html',
  styleUrls: ['./popup-manager.component.css'],
})
export class PopupManagerComponent implements OnInit {
  private projectRef: Project;
  set project(value: Project) {
    this.projectRef = value;
    if (this.projectRef) {
      this.popupStructures.EditProject = {
        name: 'Edit Project',
        inputs: [
          {
            name: 'Project name',
            type: 'text',
            value: this.projectRef.name,
            storeReference: 'name',
            action: '',
          },
          {
            name: 'Project goal',
            type: 'text',
            value: this.projectRef.goal,
            storeReference: 'goal',
            action: '',
          },
          {
            name: 'Start time',
            type: 'datetime',
            value: this.projectRef.startDate.toLocaleString(),
            storeReference: 'startDate',
            action: '',
          },
          {
            name: 'Deadline',
            type: 'datetime',
            value: this.projectRef.endDate.toLocaleString(),
            storeReference: 'endDate',
            action: '',
          },
        ],
      };
    }
  }

  constructor(private store: Store<AppState>) {
    this.store.subscribe(
      (state) => (this.chosenStructure = state.project.popupOpened)
    );
    this.store.subscribe((state) => (this.project = state.project));
  }

  popupOpened = false;
  private chosenStructureRef = '';
  set chosenStructure(value: string) {
    this.chosenStructureRef = value;
    if (value === '') {
      this.popupOpened = false;
    } else {
      this.popupOpened = true;
    }
  }

  get chosenStructure(): string {
    return this.chosenStructureRef;
  }

  popupStructures = {
    EditProject: {
      name: 'Edit Project',
      inputs: [
        {
          name: 'Project name',
          type: 'text',
          value: undefined,
          storeReference: 'name',
          action: undefined,
        },
        {
          name: 'Deadline',
          type: 'datetime',
          value: undefined,
          storeReference: 'endDate',
          action: undefined,
        },
        {
          name: 'Reset start time',
          type: 'button',
          value: undefined,
          storeReference: '',
          action: undefined,
        },
      ],
    },
  };

  ngOnInit(): void {}

  getProjectStructure(name: string) {
    return this.popupStructures[name];
  }
}
