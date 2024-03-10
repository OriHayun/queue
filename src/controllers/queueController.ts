import { NextFunction, Request, Response } from "express";
import { MessageQueue } from "../common/interfaces/messageQueue";
import Redis from "ioredis";

const queues: MessageQueue = {};

export const enqueueMessageToLocalQueue = (req: Request, res: Response, next: NextFunction) => {
  const queueName: string = <string>req.params.queueName;
  const timeout = parseInt(<string>req.query.timeout) || 10000; // Default to 10 seconds

  if (!queues[queueName] || queues[queueName].length === 0) {
    const timer = setTimeout(() => {
      res.status(204).end();
    }, timeout);

    req.on("close", () => clearTimeout(timer));
    return;
  }

  const message = queues[queueName].shift();
  res.status(200).json(message);
};

export const dequeueMessageFromLocalQueue = (req: Request, res: Response, next: NextFunction) => {
  const queueName: string = <string>req.params.queueName;
  const message = req.body;

  if (!queues[queueName]) {
    queues[queueName] = [];
  }

  queues[queueName].push(message);

  res.status(201).json({ message: "Message queued successfully" });
};

// -----------------------------BONUS USING REDIS-----------------------------------

const redis = new Redis();

export const enqueueMessageToRedisQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queueName: string = <string>req.params.queueName;
  const timeout: number = parseInt(<string>req.query.timeout) / 1000 || 10; // Default to 10 seconds

  const result = await redis.brpop(queueName, timeout);
  if (!result) {
    res.status(204).end();
  } else {
    const [, message] = result;

    res.status(200).send(JSON.parse(message));
  }
};

export const dequeueMessageFromRedisQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queueName = req.params.queueName;
  const message = JSON.stringify(req.body);
  await redis.lpush(queueName, message);

  res.status(201).send({ message: "Message queued successfully" });
};
