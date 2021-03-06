import { Project } from '../../modules/tasks/project.model';
import * as ProjectActions from '../actions/project.actions';
import { Task } from '../../models/task.model';

export type Action = ProjectActions.All;

const now = new Date();

const defaultState: Project = {
  name: 'Miniburn Project',
  goal: 'Build this app',
  tasks: {
    // 0: { name: "Minitask", status:"To do", done: false, weight: 1, project: "A10000"}
  },
  startDate: now,
  endDate: new Date(Date.now() + 60 * 1000 * 60 * 24),
  duration: 0,
  editModeId: NaN,

  popupOpened: '',
};

function reduceId(tasks: { [id: number]: Task }): { [id: number]: Task } {
  const newTasks = { ...tasks };
  Object.keys(newTasks).forEach((key) => {
    newTasks[key] = Object.assign({}, tasks[key], { _id: tasks[key]._id.$oid });
  });

  return newTasks;
}

function changeState(state: Project, options: any): Project {
  const newState = Object.assign({}, state, options);
  return newState;
}

function changeStatus(
  tasks: { [id: number]: Task },
  id: number,
  status: string
): { [id: number]: Task } {
  const newTasks = { ...tasks };
  Object.keys(newTasks).forEach((key) => {
    if (+key === id) {
      newTasks[key] = Object.assign({}, tasks[key], { status });
    }
  });
  return newTasks;
}

function changeText(
  tasks: { [id: number]: Task },
  id: number,
  text: string
): { [id: number]: Task } {
  const newTasks = { ...tasks };
  Object.keys(newTasks).forEach((key) => {
    if (+key === id) {
      newTasks[key] = Object.assign({}, tasks[key], { text });
    }
  });
  return newTasks;
}

function changeTasks(edited: { [id: number]: Task }): { [id: number]: Task } {
  const newTasks = { ...edited };
  return newTasks;
}

function deleteTask(
  tasks: { [id: number]: Task },
  id: number
): { [id: number]: Task } {
  const newTasks = { ...tasks };
  Object.keys(newTasks).forEach((key) => {
    if (+key === id) {
      newTasks[key] = Object.assign({}, tasks[key], { deleted: true });
    }
  });
  return newTasks;
}

function addTask(tasks: { [id: number]: Task }, status: string, id: string) {
  const newTasks = { ...tasks };
  newTasks[Object.keys(newTasks).length] = {
    _id: id,
    text: '',
    status,
    done: status === 'Done',
    weight: 1,
    project: 'A10000',
    deleted: false,
  };
  return newTasks;
}

export function ProjectReducer(state: Project = defaultState, action: Action) {
  switch (action.type) {
    case ProjectActions.ProjectActionTypes.CHECK_TASK:
      return changeState(state, {
        tasks: changeStatus(
          state.tasks,
          action.payload.id,
          action.payload.status
        ),
      });

    case ProjectActions.ProjectActionTypes.CREATE_TASK:
      const changedTasks = addTask(state.tasks, 'To do', action.payload);
      return changeState(state, { tasks: changedTasks });

    case ProjectActions.ProjectActionTypes.EDIT_TASK:
      let newId = action.payload;
      if (action.payload === -1) {
        newId = Object.keys(state.tasks).length - 1;
      }
      return changeState(state, { editModeId: newId });

    case ProjectActions.ProjectActionTypes.DELETE_TASK:
      return changeState(state, {
        tasks: deleteTask(state.tasks, action.payload),
      });

    case ProjectActions.ProjectActionTypes.SAVE_TASK:
      const newState = changeState(state, {
        tasks: changeText(state.tasks, action.payload.id, action.payload.text),
      });
      return changeState(newState, { editModeId: NaN });

    case ProjectActions.ProjectActionTypes.OPEN_POPUP:
      return changeState(state, { popupOpened: action.payload });

    case ProjectActions.ProjectActionTypes.UPDATE_TASK_LIST:
      const newTasks = reduceId(action.payload);
      return changeState(state, { tasks: newTasks });

    case ProjectActions.ProjectActionTypes.SAVE_FIELD:
      const options = {};
      const reference = action.payload.storeReference;
      options[reference] = action.payload.value;
      return changeState(state, options);

    default:
      return state;
  }
}

export const selectTasks = (state: Project) => state.tasks;
export const selectEditModeId = (state: Project) => state.editModeId;
