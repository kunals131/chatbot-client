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
  queryMode: QueryModes;
};

export type PopulatedResult = {
  resumeId: string;
  userId:string;
  name:string;
  email: string;
  phone: string;
  fullTimeStatus: string;
  workAvailability: string;
  fullTimeSalaryCurrency: string;
  fullTimeSalary: string;
  partTimeSalaryCurrency: string;
  partTimeSalary: string;
  fullTimeAvailability: string;
  partTimeAvailability: string;
  preferredRole: string;
  WorkExperience: string;
  Education: string;
  location: string
}

export type ChatMessage = {
  _id: ObjectId;
  response: string;
  entities: object;
  intent: string;
  sessionId: string;
  suggestedResults: {
    matches: any[];
  };
  threadId: string;
  createdAt: string;
  message: string;
  populatedResults?: PopulatedResult[]
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
  name: string;
  email: string;
} & Partial<PopulatedResult>;
