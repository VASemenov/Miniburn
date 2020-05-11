import { Task } from '../task.model';
import { TaskList } from '../models/task-list.model';

export interface Project {
  tasks: {[taskId:number] : Task};
  startDate: Date;
  endDate: Date;
  duration: number;
  editModeId: number;
}
