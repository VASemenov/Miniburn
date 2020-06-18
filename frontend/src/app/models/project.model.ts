export interface IProject {
  name: string;
  goal: string;
  isStarted: Boolean;
  isFinished: Boolean;
  startedAt: Date;
  deadline: Date;
  password: string;
}
