export enum QueryModes {
  PERCISE = "0",
  BALANCED = "1",
  BASIC = "2",
}

export type ObjectId = {
  $oid: string;
};

export type AddMessageToThreadPayload = {
  message: string;
  sessionId: string;
};

export type ChatMessage = {
  _id: ObjectId;
  response: string;
  entities: object;
  sessionId: string;
  suggestedResults: {
    matches: any[];
  };
  threadId: string;
  createdAt: string;
  message: string;
};

export type Thread = {
  _id: ObjectId;
  userId: string;
  sessionId: string;
  updatedAt: string;
  messages: ObjectId[];
  title: string;
  lastMessage: string;
};

export type EngineerSearchResult = {
  id: string;
  score: string;
  skills: string;
  ftAvailability: string;
  ptAvailability: string;
  ftSalary: string;
  ptSalary: string;
};
