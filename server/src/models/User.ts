import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  picturePath: string;
  friends: any[];
  location: string;
  occupation: string;
  viewedProfile: number;
  impressions: number;
  isTeacher: boolean;
  role: string;
  encryptPassword: (password: string) => Promise<string>;
  validatePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: false,
      min: 2,
      max: 50,
    },
    lastName: {
      type: String,
      required: false,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      min: 5,
    },
    picturePath: {
      type: String,
      default: "",
    },
    friends: {
      type: Array,
      default: [],
    },
    isTeacher: Boolean,
    role: String,
    location: String,
    occupation: String,
    viewedProfile: Number,
    impressions: Number,
  },
  { timestamps: true }
);

UserSchema.methods.encryptPassword = async (
  password: string
): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

UserSchema.methods.validatePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, (this as any).password);
};

const User = model<IUser>("User", UserSchema);
export default User;
