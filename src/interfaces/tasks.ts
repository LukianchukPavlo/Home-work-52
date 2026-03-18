import type { WorkflowCode } from "./workflow";

export interface ITask {
  id: string;
  title: string;
  description: string;
  workflow: {
    code: WorkflowCode
    label: string;
  };
  boardId: string;
  authorId: string; 
    
}

export interface IGetTasksResponse {
  data: ITask[];
  error?: any;
}

export interface IDeleteTaskResponce {
  success: boolean;
  id?: string; 
  message?: string 
}
