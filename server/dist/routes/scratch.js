"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const scratch_1 = require("./../controllers/scratch");
const router = express_1.default.Router();
router.get("/:projectId", scratch_1.getProject);
router.post("/create", scratch_1.createProject);
router.put("/update/:projectId", scratch_1.updateProject);
// router.post("/thumbnail/:projectId", updateProjectThumbnail)
exports.default = router;
//# sourceMappingURL=scratch.js.map