import express, { Router } from "express";
import {
  createProject,
  getAssets,
  getProject,
  getSb3Project,
  updateProject,
  getThumbnail,
  createAssets,
  updateInfo,
} from "./../controllers/scratch";
const router: Router = express.Router();

router.get("/get/:projectId", getProject);
router.get("/get/:projectId", getSb3Project);
router.get("/thumbnail/:projectId", getThumbnail);
router.get("/assets/:filename", getAssets);
router.post("/assets/:filename", createAssets);
router.post("/create", createProject);
router.patch("/data/:projectId", updateProject);
router.patch("/base/:projectId", updateInfo);

export default router;
