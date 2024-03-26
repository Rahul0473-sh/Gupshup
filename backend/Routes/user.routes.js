import { Router } from "express";
import { protectRoute } from "../middlewares/protectRoute.js";
import { getUsersForSideBarComponents } from "../controllers/user.controller.js";

const router = Router();
router.get("/",protectRoute,getUsersForSideBarComponents);


export default router;