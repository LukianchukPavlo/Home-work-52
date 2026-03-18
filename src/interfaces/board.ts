import type { IError } from "./getMeResponse";

export interface IBoard {
    id: string,
    name: string,
    description: string,
    authorId: string
} 
export interface IGetBoardResponse {
   data: IBoard
   error: IError;   
}
export interface CreateBoardPayload {
  name: string;
  description?: string;
}
export interface ICreateBoardResponse {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}
