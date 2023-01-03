import express, { Router } from "express"
import { createProject, getProject, updateProject, updateProjectThumbnail } from "./../controllers/scratch"
const router: Router = express.Router()

router.get("/:projectId", getProject)
router.post("/create", createProject)
router.put("/update/:projectId", updateProject)
// router.post("/thumbnail/:projectId", updateProjectThumbnail)


export default router;