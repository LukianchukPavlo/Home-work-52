import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {  IGetBoardResponse, ICreateBoardResponse, CreateBoardPayload } from "../../../interfaces";

const baseUrl = 'http://localhost:3000/api/v1/boards';

const apiName = "boardsApi";

export const boardsApi = createApi({
    reducerPath: apiName,
    baseQuery: fetchBaseQuery({
        baseUrl: baseUrl,
        credentials: "include"
    }),
    tagTypes: ['Boards', 'BoardTasks'],
    endpoints: build => ({
        getBoards: build.query<IGetBoardResponse, void>({
            query: () => ({
            url: "",
            method: "GET",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
            }),
            providesTags: ['Boards'],
        }),
        getBoard: build.query<IGetBoardResponse, string>({
            query: (boardId: string) => `/${boardId}`,
        }),
        createBoard: build.mutation<ICreateBoardResponse, CreateBoardPayload>({
            query: (body) => ({
            url: "",
            method: "POST",
            body,
        }),
            invalidatesTags: ["Boards"],
        }),
        deleteBoard: build.mutation<void, string>({
            query: (boardId) => ({
            url: `/${boardId}`,
            method: "DELETE",
        }),
            invalidatesTags: ["Boards"],
        }),
        updateBoard: build.mutation({
            query: ({ id, name, description }) => ({
            url: `/${id}`,
            method: "PUT",
            body: { name, description },
        }),
            invalidatesTags: ["Boards"],
        }),


    })
})  

export const { useGetBoardsQuery, useGetBoardQuery, useCreateBoardMutation, useDeleteBoardMutation, useUpdateBoardMutation } = boardsApi

