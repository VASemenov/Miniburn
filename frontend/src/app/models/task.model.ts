export interface Task {
  _id?: string;
  text: string;
  status: string;
  done: Boolean;
  weight: number;
  project: string;
}
