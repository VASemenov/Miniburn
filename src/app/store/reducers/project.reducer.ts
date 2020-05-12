import { Project } from '../../tasks/project.model';
import * as ProjectActions from '../actions/project.actions';
import { Task } from 'src/app/models/task.model';

export type Action = ProjectActions.All;

const defaultState: Project = {
  name: "Miniburn Project",
  tasks: {
    0: { text:"Minitask", status:"To do"}
  },
  startDate: new Date(),
  endDate: new Date(),
  duration: 0,
  editModeId: NaN,

  popupOpened: ""
}

function changeState(state: Project, options:any):Project {
  let newState = Object.assign({}, state, options);
  console.log(newState);
  return newState;
}

function changeStatus(tasks: {[id:number]:Task}, id: number, status: string) {
  let newTasks = {...tasks};
  Object.keys(newTasks).forEach(key => {
    if (+key == id) {
      newTasks[key] = {
        text: newTasks[key].text,
        status: status
      }
    }
  });
  return newTasks;
}

function changeText(tasks: {[id:number]:Task}, id: number, text: string) {
  let newTasks = {...tasks};
  Object.keys(newTasks).forEach(key => {
    if (+key == id) {
      newTasks[key] = {
        text: text,
        status: newTasks[key].status
      }
    }
  });
  return newTasks;
}

function addTask(tasks: {[id:number]:Task}, status: string) {
  let newTasks = {...tasks};
  newTasks[Object.keys(newTasks).length] = {text: "", status: status};
  return newTasks;
}

export function ProjectReducer(state:Project = defaultState, action: Action) {
  switch(action.type) {
    case ProjectActions.ProjectActionTypes.CHECK_TASK:
      return changeState(state, {tasks: changeStatus(state.tasks, action.payload.id, action.payload.status)});


    case ProjectActions.ProjectActionTypes.CREATE_TASK:
      let changedTasks = addTask(state.tasks, "To do");
      return changeState(state, {tasks: changedTasks});


    case ProjectActions.ProjectActionTypes.EDIT_TASK:
      var newId = action.payload;
      if (action.payload == -1) {
        newId = Object.keys(state.tasks).length - 1;
      }
      return changeState(state, {editModeId: newId});


    case ProjectActions.ProjectActionTypes.SAVE_TASK:
      let newState = changeState(state, {tasks: changeText(state.tasks, action.payload.id, action.payload.text)});
      return changeState(newState, {editModeId: NaN})

    case ProjectActions.ProjectActionTypes.OPEN_POPUP:
      return changeState(state, {popupOpened: action.payload});

    default:
      return state;
  }


}

export const selectTasks = (state: Project) => state.tasks;
export const selectEditModeId = (state: Project) => state.editModeId;
