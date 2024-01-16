import express, { Router } from "express";
import { verifyToken } from "../middleware/auth";
import { createProject, getAssets, getProject, getThumbnail, createAssets, updateInfo } from "./../controllers/scratch";

const router: Router = express.Router();

router.get("/get/:projectId", verifyToken, getProject);
router.get("/thumbnail/:projectId", verifyToken, getThumbnail);
router.get("/assets/:filename", verifyToken, getAssets);
router.post("/assets/:filename", verifyToken, createAssets);
router.post("/create", verifyToken, createProject);
router.patch("/base/:projectId", verifyToken, updateInfo);

export default router;
