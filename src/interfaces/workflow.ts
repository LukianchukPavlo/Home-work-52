export enum WorkflowCode {
  TODO = "todo",
  PROGRESS = "progress",
  DONE = "done",
}

export interface Workflow {
  code: WorkflowCode;
  label: string; 
}
