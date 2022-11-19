import { Schema, model, models } from 'mongoose'

// Document Interface
export interface IUser {
  name: string;
  email: string;
  password: string;
  Bank_Name: string;
  Account_Number: string,
  Secret_Code: string
  balance: number;

}




// Schema For User
const schema = new Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  Bank_Name: { type: String },
  Account_Number: { type: String },
  Secret_Code: { type: String },
  balance: { type: Number },
})

export const User = models.User || model<IUser>('User', schema)