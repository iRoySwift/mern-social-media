import express, { Router } from "express";
import {
  createProject,
  getAssets,
  getProject,
  updateProject,
  getThumbnail,
  createAssets,
  updateInfo,
  updateTitle
} from "./../controllers/scratch";
const router: Router = express.Router();

router.get("/:projectId", getProject);
router.get("/thumbnail/:projectId", getThumbnail)
router.get("/assets/:filename", getAssets);
router.post("/assets/:filename", createAssets);
router.post("/create", createProject);
router.put("/update/:projectId", updateProject);
router.post("/update/info", updateInfo)
router.post("/update/title", updateTitle)

export default router;
