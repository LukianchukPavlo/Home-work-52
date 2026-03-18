export interface IUser {
  id: string;   
  name: string;
  email: string;
}

export interface IErrorDetail {
  field: string;
  message: string;
}

export interface IError {
  code: string;
  message: string;
  details: IErrorDetail[];
}

export interface IGetMeResponse {
  data: IUser;
  error: IError;
}