import { Router } from "express";
import * as regPage from "./registration.js";
const router = Router();
router.post("/signup", regPage.signup);
router.post("/login", regPage.login);

export default router;
