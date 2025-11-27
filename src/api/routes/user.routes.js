import { Router } from "express";
import { insertUser } from "../controller/user.controllers.js";

const router = Router();
router.post("/", insertUser);

export default router;
