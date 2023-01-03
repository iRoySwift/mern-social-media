"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
/* CONFIGURATIONS dotenv 必须在被引用文件前调用 */
dotenv_1.default.config();
const mongoose_1 = __importDefault(require("mongoose"));
const app_1 = __importDefault(require("./app"));
/* ADD DATA ONE TIME */
// import User from "./models/User";
// import Post from "./models/Post";
// import { users, posts } from "./data/index";
/* MONGOOSE SETUP */
const PORT = process.env.PORT || 6001;
const URL = process.env.MONGO_URL || '';
mongoose_1.default.set("strictQuery", true);
mongoose_1.default.connect(URL).then(() => {
    app_1.default.listen(PORT, () => console.log(`Server Port: ${PORT}`));
    /* ADD DATA ONE TIME */
    // User.insertMany(users);
    // Post.insertMany(posts);
}).catch((error) => console.log(`${error} did not connect`));
//# sourceMappingURL=index.js.map