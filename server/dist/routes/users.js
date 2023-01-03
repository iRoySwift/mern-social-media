"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const users_1 = require("../controllers/users");
const auth_1 = require("../middleware/auth");
const router = express_1.default.Router();
/* READ */
router.get("/:id", auth_1.verifyToken, users_1.getUser);
router.get("/:id/friends", auth_1.verifyToken, users_1.getUserFriends);
/* UPDATE */
router.patch("/:id/:friendId", auth_1.verifyToken, users_1.addRemoveFriend);
exports.default = router;
//# sourceMappingURL=users.js.map