import { Router } from "express";
import { getMessageFromQueue, addMessageToQueue } from "../controllers/queueController";
const router = Router();

router.get("/api/:queueName", getMessageFromQueue);
router.post("/api/:queueName", addMessageToQueue);

export default router;
