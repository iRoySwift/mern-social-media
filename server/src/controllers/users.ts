import { Request, Response } from "express";
import User, { IUser } from "../models/User";

/* READ */
export const getUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;
    const user = await User.findById(userId);
    res.status(200).json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// /* UPDATE */
// export const addRemoveFriend = async (req: Request, res: Response) => {
//   try {
//     const { id, friendId } = req.params;
//     const user = await User.findById(id);
//     const friend = await User.findById(friendId);
//     if (user!.friends.includes(friendId)) {
//       user!.friends = user!.friends.filter(id => id != friendId);
//       friend!.friends = friend!.friends.filter(id => id !== id);
//     } else {
//       user!.friends.push(friendId);
//       friend!.friends.push(id);
//     }
//     await user!.save();
//     await friend!.save();
//     const friends = await Promise.all(user!.friends.map(id => User.findById(id)));
//     const formattedFriends = friends.map(friend => ({
//       _id: friend?._id,
//       firstName: friend?.firstName,
//       lastName: friend?.lastName,
//       occupation: friend?.occupation,
//       location: friend?.location,
//       picturePath: friend?.picturePath
//     }));
//     res.status(200).json(formattedFriends);
//   } catch (error: any) {
//     res.status(404).json({ message: error.message });
//   }
// };
