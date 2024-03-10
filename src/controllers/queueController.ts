import { NextFunction, Request, Response } from "express";
import { Queues, Consumers, Consumer, Message } from "../common/interfaces/messageQueue";
import Redis from "ioredis";

// -----------------------------BASIC-----------------------------------

const queues: Queues = {};
const consumers: Consumers = {};

const dequeueMessage = async (
  queueName: string,
  timeout: number = 10000
): Promise<Message | null> => {
  if (!queues[queueName]) {
    queues[queueName] = [];
  }

  if (!consumers[queueName]) {
    consumers[queueName] = [];
  }

  if (queues[queueName].length > 0) {
    return queues[queueName].shift()!;
  } else {
    return new Promise((resolve) => {
      const timerId = setTimeout(() => {
        const index = consumers[queueName].findIndex((consumer) => consumer.resolve === resolve);
        if (index !== -1) {
          consumers[queueName].splice(index, 1);
        }
        resolve(null);
      }, timeout);

      consumers[queueName].push({ resolve, timerId });
    });
  }
};

const enqueueMessage = async (queueName: string, message: Message): Promise<void> => {
  if (!queues[queueName]) {
    queues[queueName] = [];
  }

  if (!consumers[queueName]) {
    consumers[queueName] = [];
  }

  if (consumers[queueName].length > 0) {
    const consumer: Consumer | undefined = consumers[queueName].shift();
    if (consumer) {
      consumer.resolve(message);
    }
  } else {
    queues[queueName].push(message);
  }
};

export const dequeueMessageFromLocalQueue = (req: Request, res: Response, next: NextFunction) => {
  const queueName: string = <string>req.params.queueName;
  const timeout: number = parseInt(<string>req.query.timeout) || 10000;

  dequeueMessage(queueName, timeout)
    .then((message) => {
      if (!message) {
        res.status(204).send();
      } else {
        res.status(200).json(message);
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

export const enqueueMessageToLocalQueue = (req: Request, res: Response, next: NextFunction) => {
  const queueName: string = <string>req.params.queueName;
  const message: Message = req.body;
  enqueueMessage(queueName, message);
  res.status(201).json({ message: "Message queued successfully" });
};

// -----------------------------BONUS USING REDIS-----------------------------------

const redis = new Redis();

export const dequeueMessageFromRedisQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queueName: string = <string>req.params.queueName;
  const timeout: number = parseInt(<string>req.query.timeout) / 1000 || 10; // Default to 10 seconds, possible to extract it to env variable or add it as a constant in common/constants.ts

  const result = await redis.brpop(queueName, timeout);
  if (!result) {
    res.status(204).end();
  } else {
    const [, message] = result;

    res.status(200).send(JSON.parse(message));
  }
};

export const enqueueMessageToRedisQueue = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const queueName = req.params.queueName;
  const message = JSON.stringify(req.body);
  await redis.lpush(queueName, message);

  res.status(201).send({ message: "Message queued successfully" });
};