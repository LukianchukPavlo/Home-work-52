import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { type IDeleteTaskResponce, type ITask, type UpdateTaskPayload, type WorkflowCode } from "../../../interfaces";

const baseUrl = "http://localhost:3000/api/v1/tasks";

export const tasksApi = createApi({
  reducerPath: "tasksApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  tagTypes: ["Tasks"],
  endpoints: (build) => ({
    
    getTasks: build.query<ITask[], string>({
      query: (boardId) => ({
        url: "tasks",
        params: { boardId },
      }),
      providesTags: ["Tasks"],
    }),

    updateTask: build.mutation<ITask, UpdateTaskPayload>({
      query: ({ taskId, body }) => ({
        url: `tasks/${taskId}`,
        method: "PATCH", 
        body,
      }),
      invalidatesTags: ["Tasks"],
    }),

    deleteTask: build.mutation<IDeleteTaskResponce, string>({
      query: (taskId) => ({
        url: `tasks/${taskId}`, 
        method: "DELETE",
      }),
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
            await queryFulfilled;
            dispatch(tasksApi.util.invalidateTags(["Tasks"]))
        } catch {

        }
      }
    }),
    createTask: build.mutation<ITask, { boardId: string; title: string; description?: string; workflow?: { code: WorkflowCode } }>({
        query: ({ boardId, ...body }) => ({
            url: "tasks",
            method: "POST",
            body: { boardId, ...body },
        }),
        invalidatesTags: ["Tasks"],
    }),
    updateTaskContent: build.mutation<ITask,{ taskId: string; body: { title?: string; description?: string } }>({
        query: ({ taskId, body }) => ({
            url: `tasks/${taskId}`, 
            method: "PATCH",
            body,
        }),
        invalidatesTags: ["Tasks"],
    }),
  }),  
});

export const { useGetTasksQuery, useUpdateTaskMutation, useDeleteTaskMutation, useCreateTaskMutation, useUpdateTaskContentMutation } = tasksApi;