export interface Message {
  [key: string]: any; // Define according to your actual message structure
}

type Queue = Message[];
export interface Queues {
  [queueName: string]: Queue;
}

export interface Consumer {
  resolve: (value: Message | null) => void;
  timerId: NodeJS.Timeout;
}

export interface Consumers {
  [queueName: string]: Consumer[];
}
