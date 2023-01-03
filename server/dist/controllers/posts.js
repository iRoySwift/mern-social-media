"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.likePost = exports.getUserPosts = exports.getFeedPosts = exports.createPost = void 0;
const Post_1 = __importDefault(require("../models/Post"));
const User_1 = __importDefault(require("../models/User"));
/* Create */
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId, description, picturePath } = req.body;
        const user = yield User_1.default.findById(userId);
        const newPost = new Post_1.default({
            userId,
            firstName: user === null || user === void 0 ? void 0 : user.firstName,
            lastName: user === null || user === void 0 ? void 0 : user.lastName,
            location: user === null || user === void 0 ? void 0 : user.location,
            description,
            userPicturePath: user === null || user === void 0 ? void 0 : user.picturePath,
            picturePath,
            likes: {},
            comments: [],
        });
        yield newPost.save();
        const post = yield Post_1.default.find();
        res.status(201).json(post);
    }
    catch (error) {
        res.status(409).json({ message: error === null || error === void 0 ? void 0 : error.message });
    }
});
exports.createPost = createPost;
/* READ */
const getFeedPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield Post_1.default.find();
        res.status(200).json(post);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getFeedPosts = getFeedPosts;
const getUserPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const post = yield Post_1.default.find({ userId });
        res.status(200).json(post);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getUserPosts = getUserPosts;
/* UPDATE */
const likePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { userId } = req.body;
        const post = yield Post_1.default.findById(id);
        const isLiked = (_a = post === null || post === void 0 ? void 0 : post.likes) === null || _a === void 0 ? void 0 : _a.get(userId);
        if (isLiked) {
            post.likes.delete(userId);
        }
        else {
            post.likes.set(userId, true);
        }
        const updatePost = yield Post_1.default.findByIdAndUpdate(id, { likes: post.likes }, { new: true });
        res.status(200).json(updatePost);
    }
    catch (error) {
        res.status(404).json({ error: error.message });
    }
});
exports.likePost = likePost;
//# sourceMappingURL=posts.js.map