import { Action } from "@ngrx/store";
import { Task } from '../../models/task.model'
import { TaskStatus } from '../../models/task-status.model';
import { TaskText } from 'src/app/models/task-text.model';
import { InputField } from 'src/app/models/input-field.model';

export enum ProjectActionTypes {
  CHECK_TASK = "[Task] Check",
  CREATE_TASK = "[Task] Create",
  EDIT_TASK = "[Task] Edit",
  DELETE_TASK = "[Task] Delete",
  SAVE_TASK = "[Task] Save",
  OPEN_POPUP = "[UI] OpenPopup",
  SAVE_FIELD = "[UI] SaveField",
  RESET_START_TIME = "[PROJ] ResetStartTime",
  UPDATE_TASK_LIST = "[PROJ] UpdateTaskList"
}

export class CheckTask implements Action {
  readonly type = ProjectActionTypes.CHECK_TASK;

  constructor(public payload: TaskStatus) {}
}

export class CreateNew implements Action {
  readonly type = ProjectActionTypes.CREATE_TASK;

  constructor(public payload: string) {};
}

export class DeleteTask implements Action {
  readonly type = ProjectActionTypes.DELETE_TASK;

  constructor(public payload: number) {};
}

export class EditTask implements Action {
  readonly type = ProjectActionTypes.EDIT_TASK;

  constructor(public payload: number) {}
}

export class SaveTask implements Action {
  readonly type = ProjectActionTypes.SAVE_TASK;

  constructor(public payload: TaskText) {};
}

export class UpdateTaskList implements Action {
  readonly type = ProjectActionTypes.UPDATE_TASK_LIST;

  constructor(public payload: {[taskId:number] : Task}){}
}

export class OpenPopup implements Action {
  readonly type = ProjectActionTypes.OPEN_POPUP;

  constructor(public payload: string) {};
}

export class SaveField implements Action {
  readonly type = ProjectActionTypes.SAVE_FIELD;

  constructor(public payload: InputField) {};
}

export class ResetStartTime implements Action {
  readonly type = ProjectActionTypes.RESET_START_TIME;
}

export type All
= CheckTask
| CreateNew
| DeleteTask
| EditTask
| SaveTask
| OpenPopup
| SaveField
| ResetStartTime
| UpdateTaskList;
