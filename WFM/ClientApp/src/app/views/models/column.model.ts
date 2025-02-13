import { JobApplication } from "./jobApplication.model";

export class Column {
  constructor(public name: string, public id: number, public tasks: JobApplication[]) {}
}
