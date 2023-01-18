import express, { Router } from "express";
import { login, getUser } from "../controllers/auth";

const router: Router = express.Router();

router.post("/login", login);
router.get("/:email", getUser);

export default router;
