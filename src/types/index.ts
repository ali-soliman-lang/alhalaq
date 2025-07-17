import { Request } from 'express';
import { Document } from 'mongoose';

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  phoneNumber: string;
  job: string;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

export interface IUserRequest extends Request {
  user?: IUser;
}

export interface DecodedToken {
  id: string;
  iat: number;
  exp: number;
}