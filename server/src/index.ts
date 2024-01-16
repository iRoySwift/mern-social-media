import dotenv from "dotenv";
/* CONFIGURATIONS dotenv 必须在被引用文件前调用 */
dotenv.config();
import mongoose from "mongoose";
import app from "./app";

/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
const URL = process.env.MONGO_URL || "";

mongoose.set("strictQuery", true);

let a = app.listen(PORT, () => console.log(`Server Port: ${PORT}`));

// mongoose
//   .connect(URL)
//   .then(() => {})
//   .catch(error => console.log(`${error} did not connect`));
