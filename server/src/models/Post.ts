import { Schema, model, Document } from "mongoose";

export interface IPost extends Document {
  userId: string
  firstName: string
  lastName: string
  location: string
  description: string
  picturePath: string
  userPicturePath: string
  likes: Map<string, boolean>
  comments: string[]
}

const postSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    location: String,
    description: String,
    picturePath: String,
    userPicturePath: String,
    likes: {
      type: Map,
      of: Boolean,
    },
    comments: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
)

const Post = model<IPost>("Post", postSchema)

export default Post;
