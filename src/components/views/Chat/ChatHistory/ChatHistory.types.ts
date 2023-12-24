type ObjectId = {
  $oid: string;
};

export type Thread = {
  _id:ObjectId;
  userId: string;
  sessionId: string;
  updatedAt: string;
  messages: ObjectId[];
  title: string;
  lastMessage: string;
};
