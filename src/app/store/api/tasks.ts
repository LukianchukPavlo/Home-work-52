import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type IDeleteTaskResponce, type ITask, type WorkflowCode } from "../../../interfaces";

const baseUrl = "http://localhost:3000/api/v1/tasks";

const apiName = 'taskApi'

export const tasksApi = createApi({
  reducerPath: apiName,
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: 'include'
  }),
  tagTypes: ["Tasks", "Task"],
  endpoints: (build) => ({
    
    getTasks: build.query<ITask[], string>({
      query: (boardId) => ({
        url: "/",
        params: { boardId },
      }),
      transformResponse: (response: any) => {
        return response?.data || response;
      },
      providesTags: ["Tasks"] ,
    }),

    getTask: build.query<ITask, string>({
      query: (taskId) => `/${taskId}`,
      transformResponse: (response: any) => {
        return response?.data || response;
      },
      providesTags: ["Task"],
    }),
    
    updateTask: build.mutation<ITask, {taskId: string; body: { title?: string; description?: string };}>({
      query: ({ taskId, body }) => ({
        url: `/${taskId}`,
        method: "PUT", 
        body,
      }),
      invalidatesTags: ["Tasks", "Task"],
    }),

    updateTaskWorkflow: build.mutation<ITask,{ taskId: string; workflow: WorkflowCode }>({
      query: ({ taskId, workflow }) => ({
        url: `/${taskId}/workflow`,
        method: "PUT",
        body: { workflow },
      }),
      invalidatesTags: ["Tasks", "Task"],
    }),

    

    deleteTask: build.mutation<IDeleteTaskResponce, string>({
      query: (taskId) => ({
        url: `/${taskId}`, 
        method: "DELETE",
      }),
      invalidatesTags: ["Tasks"],
    }),
    createTask: build.mutation<ITask, { boardId: string; title: string; description?: string; workflow?: { code: WorkflowCode } }>({
        query: ({ boardId, ...body }) => ({
            url: "/",
            method: "POST",
            body: { boardId, ...body },
        }),
        invalidatesTags: ["Tasks"],
    }), 
  }),  
});

export const { 
  useGetTasksQuery,
  useGetTaskQuery,
  useUpdateTaskMutation,
  useUpdateTaskWorkflowMutation,
  useDeleteTaskMutation,
  useCreateTaskMutation,} = tasksApi;