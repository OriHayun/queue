import { Router } from "express";
import {
  enqueueMessageToRedisQueue,
  dequeueMessageFromRedisQueue,
} from "../controllers/queueController";
const router = Router();

router.get("/api/:queueName", enqueueMessageToRedisQueue);
router.post("/api/:queueName", dequeueMessageFromRedisQueue);

export default router;
