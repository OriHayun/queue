import { NextFunction, Request, Response } from "express";
import { MessageQueue } from "../common/interfaces/messageQueue";

const queues: MessageQueue = {};

export const getMessageFromQueue = (req: Request, res: Response, next: NextFunction) => {
  console.log(queues);
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

export const addMessageToQueue = (req: Request, res: Response, next: NextFunction) => {
  const queueName: string = <string>req.params.queueName;
  const message = req.body;

  if (!queues[queueName]) {
    queues[queueName] = [];
  }

  queues[queueName].push(message);
  console.log(queues);
  res.status(201).json({ message: "Message queued successfully" });
};
