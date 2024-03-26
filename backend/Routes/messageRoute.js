import { Router } from "express";
import { sendMessage ,getMessages} from "../controllers/message.controller.js";
import { protectRoute } from "../middlewares/protectRoute.js";
const router = Router();

router.post("/:id", protectRoute, getMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
