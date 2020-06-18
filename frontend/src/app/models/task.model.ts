export interface Task {
  _id?: {$oid: string}
  text: string;
  status: string;
  done: Boolean;
  weight: number;
  project: string;
}
