import { Task } from '../../models/task.model';

export interface Project {
  name: string;
  goal: string;
  tasks: { [taskId: number]: Task };
  startDate: Date;
  endDate: Date;
  duration: number;
  editModeId: number;

  popupOpened: string;
}
