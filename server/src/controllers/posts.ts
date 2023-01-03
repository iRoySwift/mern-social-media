import { Request, Response } from "express";
import Post from "../models/Post";
import User from "../models/User";

/* Create */
export const createPost = async (req: Request, res: Response) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user?.firstName,
      lastName: user?.lastName,
      location: user?.location,
      description,
      userPicturePath: user?.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();
    const post = await Post.find()
    res.status(201).json(post)
  } catch (error: any) {
    res.status(409).json({ message: error?.message })
  }
}

/* READ */
export const getFeedPosts = async (req: Request, res: Response) => {
  try {
    const post = await Post.find()
    res.status(200).json(post)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

export const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId })
    res.status(200).json(post)
  } catch (error: any) {
    res.status(404).json({ message: error.message })
  }
}

/* UPDATE */
export const likePost = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id)
    const isLiked = post?.likes?.get(userId)
    if (isLiked) {
      post!.likes!.delete(userId)
    } else {
      post!.likes!.set(userId, true)
    }
    const updatePost = await Post.findByIdAndUpdate(
      id,
      { likes: post!.likes },
      { new: true }
    )
    res.status(200).json(updatePost)
  } catch (error: any) {
    res.status(404).json({ error: error.message })
  }
}