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
exports.addRemoveFriend = exports.getUserFriends = exports.getUser = void 0;
const User_1 = __importDefault(require("../models/User"));
/* READ */
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findById(id);
        res.status(200).json(user);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getUser = getUser;
const getUserFriends = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const user = yield User_1.default.findById(id);
        const friends = yield Promise.all(user.friends.map((id) => User_1.default.findById(id)));
        const formattedFriends = friends.map((friend) => ({ _id: friend === null || friend === void 0 ? void 0 : friend._id, firstName: friend === null || friend === void 0 ? void 0 : friend.firstName, lastName: friend === null || friend === void 0 ? void 0 : friend.lastName, occupation: friend === null || friend === void 0 ? void 0 : friend.occupation, location: friend === null || friend === void 0 ? void 0 : friend.location, picturePath: friend === null || friend === void 0 ? void 0 : friend.picturePath }));
        res.status(200).json(formattedFriends);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.getUserFriends = getUserFriends;
/* UPDATE */
const addRemoveFriend = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, friendId } = req.params;
        const user = yield User_1.default.findById(id);
        const friend = yield User_1.default.findById(friendId);
        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id != friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        }
        else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        yield user.save();
        yield friend.save();
        const friends = yield Promise.all(user.friends.map((id) => User_1.default.findById(id)));
        const formattedFriends = friends.map((friend) => ({ _id: friend === null || friend === void 0 ? void 0 : friend._id, firstName: friend === null || friend === void 0 ? void 0 : friend.firstName, lastName: friend === null || friend === void 0 ? void 0 : friend.lastName, occupation: friend === null || friend === void 0 ? void 0 : friend.occupation, location: friend === null || friend === void 0 ? void 0 : friend.location, picturePath: friend === null || friend === void 0 ? void 0 : friend.picturePath }));
        res.status(200).json(formattedFriends);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
});
exports.addRemoveFriend = addRemoveFriend;
//# sourceMappingURL=users.js.map