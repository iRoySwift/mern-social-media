"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const posts_1 = require("../controllers/posts");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
/* READ */
router.get("/", auth_1.verifyToken, posts_1.getFeedPosts);
router.get("/:userId/posts", auth_1.verifyToken, posts_1.getUserPosts);
/* UPDATE */
router.patch("/:id/like", auth_1.verifyToken, posts_1.likePost);
exports.default = router;
//# sourceMappingURL=posts.js.map