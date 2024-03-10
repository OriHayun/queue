import { Router } from "express";
import {
  enqueueMessageToLocalQueue,
  dequeueMessageFromLocalQueue,
  enqueueMessageToRedisQueue,
  dequeueMessageFromRedisQueue,
} from "../controllers/queueController";
const router = Router();

// -----------------------------BASIC-----------------------------------

router.get("/api/v1/:queueName", dequeueMessageFromLocalQueue);
router.post("/api/v1/:queueName", enqueueMessageToLocalQueue);

// -----------------------------BONUS USING REDIS-----------------------------------

router.get("/api/:queueName", dequeueMessageFromRedisQueue);
router.post("/api/:queueName", enqueueMessageToRedisQueue);

export default router;
