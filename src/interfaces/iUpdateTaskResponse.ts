import type { ITask } from "./tasks";
import { WorkflowCode } from "./workflow";

export interface IUpdateTaskResponse {
  data: ITask;
  error: any;
}

export interface UpdateTaskPayload {
  taskId: string;
  body: {
    workflow: { code: WorkflowCode };
  };
}