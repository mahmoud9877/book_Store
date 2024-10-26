import { Router } from "express";
import * as userPage from "./user.js";
const router = Router();

router.get("/", userPage.users);

export default router;
