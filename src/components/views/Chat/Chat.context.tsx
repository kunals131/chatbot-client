import { createContext, useContext, useState } from "react";
import { ChatMessage, QueryModes } from "./Chat.types";

type TChatContext = {
  messages: ChatMessage[];
  sendMessage: (message: string) => void;
  queryMode: string;
  setQueryMode: (mode: QueryModes) => void;
  sessionId: string;
  activeThreadId: string;
  setActiveThreadId: (threadId: string) => void;
};

export const ChatContext = createContext<TChatContext>({
  messages: [],
  sendMessage: (message: string) => {},
  queryMode: "",
  setQueryMode: (mode: QueryModes) => {},
  sessionId: "",
  activeThreadId: "",
  setActiveThreadId: (threadId: string) => {},
});

export const ChatContextProvider = ({ children }: any) => {
  const [queryMode, setQueryMode] = useState<QueryModes>(QueryModes.BALANCED);
  const [sessionId, setSessionId] = useState("");
  const [activeThreadId, setActiveThreadId] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  const sendMessage = (message: string) => {
    setMessages([
      ...messages,
      {
        _id: `${messages.length}`,
        response: message,
        entities: {},
        sessionId: sessionId,
        suggestedResults: [],
        threadId: activeThreadId,
      },
    ]);
  };
  const value = {
    messages,
    sendMessage,
    queryMode,
    setQueryMode,
    sessionId,
    setSessionId,
    activeThreadId,
    setActiveThreadId,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext);
