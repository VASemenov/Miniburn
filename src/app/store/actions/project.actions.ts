import { Action } from "@ngrx/store";
import { Task } from '../../models/task.model'
import { TaskStatus } from '../../models/task-status.model';
import { TaskText } from 'src/app/models/task-text.model';

export enum ProjectActionTypes {
  CHECK_TASK = "[Task] Check",
  CREATE_TASK = "[Task] Create",
  EDIT_TASK = "[Task] Edit",
  DELETE_TASK = "[Task] Delete",
  SAVE_TASK = "[Task] Save",
  OPEN_POPUP = "[UI] OpenPopup"
}

export class CheckTask implements Action {
  readonly type = ProjectActionTypes.CHECK_TASK;

  constructor(public payload: TaskStatus) {}
}

export class CreateNew implements Action {
  readonly type = ProjectActionTypes.CREATE_TASK;
}

export class EditTask implements Action {
  readonly type = ProjectActionTypes.EDIT_TASK;

  constructor(public payload: number) {}
}

export class SaveTask implements Action {
  readonly type = ProjectActionTypes.SAVE_TASK;

  constructor(public payload: TaskText) {};
}

export class OpenPopup implements Action {
  readonly type = ProjectActionTypes.OPEN_POPUP;

  constructor(public payload: string) {};
}

export type All
= CheckTask
| CreateNew
| EditTask
| SaveTask
| OpenPopup;
