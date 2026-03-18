import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { ISignIn, ISignInResponse, ISignUp, ISignUpResponse, IGetMeResponse } from "../../../interfaces";


const baseUrl = 'http://localhost:3000/api/v1/auth';

const apiName = "authApi"

export const authApi = createApi({
    reducerPath: apiName,
    baseQuery: fetchBaseQuery({ 
        baseUrl: baseUrl,
        credentials: "include"
    }),
    endpoints: build => ({
        signIn: build.mutation<ISignInResponse, ISignIn>({
            query: (body) => ({
                url: "sign-in",
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body,
            }),
        }),
        signUp: build.mutation<ISignUpResponse, ISignUp>({
            query: (body) => ({
                url: "sign-up",
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
                body,
            })
        }),
        signOut: build.mutation<void, void>({
            query: () => ({
                url: "sign-out",
                method: "POST",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
            })
        }),
        me: build.query<IGetMeResponse, void>({
            query: () => ({
                url: "me",
                method: "GET",
                headers: {
                    "Content-Type": "application/json;charset=utf-8"
                },
            })
        }), 
        
    }),       
})

export const { useSignInMutation, useSignUpMutation, useMeQuery, useSignOutMutation } = authApi