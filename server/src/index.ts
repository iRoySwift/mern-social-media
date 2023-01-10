import dotenv from "dotenv";
/* CONFIGURATIONS dotenv 必须在被引用文件前调用 */
dotenv.config();
import mongoose from "mongoose";
import app from "./app";
/* ADD DATA ONE TIME */
// import User from "./models/User";
// import Post from "./models/Post";
// import { users, posts } from "./data/index";

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
const URL = process.env.MONGO_URL || "";

mongoose.set("strictQuery", true);

mongoose
  .connect(URL)
  .then(() => {
    app.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
  })
  .catch((error) => console.log(`${error} did not connect`));
