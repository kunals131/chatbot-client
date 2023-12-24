export enum QueryModes {
  PERCISE = "0",
  BALANCED = "1",
  BASIC = "2",
}

export type ChatMessage = {
  _id: string;
  response: string;
  entities: object;
  sessionId: string;
  suggestedResults: object[];
  threadId: string;
};
