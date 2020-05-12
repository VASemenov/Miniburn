import { Task } from '../models/task.model';
import { TaskList } from '../models/task-list.model';

export interface Project {
  name: string;
  tasks: {[taskId:number] : Task};
  startDate: Date;
  endDate: Date;
  duration: number;
  editModeId: number;

  popupOpened: string;
}
