import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  mobile: string;
  password?: string;
  encryptPassword: (password: string) => Promise<string>;
  validatePassword: (password: string) => Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    mobile: {
      type: String,
      required: false,
      min: 2,
      max: 50
    },
    password: {
      type: String,
      required: true,
      min: 5
    }
  },
  { timestamps: true }
);

/**
 * * 实用bcrypt加密后存储密码
 * @param password
 * @returns
 */
UserSchema.methods.encryptPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(password, salt);
};

/**
 * * 验证登录密码
 * @param password
 * @returns
 */
UserSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, (this as any).password);
};

const User = model<IUser>("User", UserSchema);
export default User;
