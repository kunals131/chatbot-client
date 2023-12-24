import { createContext, useContext, useEffect, useState } from "react";
import { ChatMessage, QueryModes, Thread } from "./Chat.types";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { addMessageToThread, getThreadMessages } from "./Chat.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

type TChatContext = {
  messages: ChatMessage[];
  sendMessage: (message: string, onSuccess?: () => void) => void;
  queryMode: string;
  setQueryMode: (mode: QueryModes) => void;
  sessionId: string;
  setSessionId: (id: string) => void;
  activeThread: Thread | null;
  setActiveThread: (thread: Thread) => void;
  fetchThreadMessagesLoading: boolean;
  fetchThreadMessagesError: boolean;
  tempMessage: string;
  sendMessageLoading: boolean;
  isSendMessageError: boolean;
  lastMessageId: string;
  setLastMessageId: (val: string) => void;
};

export const ChatContext = createContext<TChatContext>({
  messages: [],
  sendMessage: () => {},
  queryMode: "",
  setQueryMode: () => {},
  sessionId: "",
  activeThread: null,
  setActiveThread: () => {},
  fetchThreadMessagesLoading: false,
  fetchThreadMessagesError: false,
  tempMessage: "",
  sendMessageLoading: false,
  isSendMessageError: false,
  lastMessageId: "",
  setLastMessageId: () => {},
  setSessionId: () => {},
});

export const ChatContextProvider = ({ children }: any) => {
  const [queryMode, setQueryMode] = useState<QueryModes>(QueryModes.BALANCED);
  const [sessionId, setSessionId] = useState("");
  const [activeThread, setActiveThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tempMessage, setTempMessage] = useState("");
  const [lastMessageId, setLastMessageId] = useState("");
  const activeThreadId = activeThread?._id?.$oid || "";

  const {
    data: fetchedMessages,
    isLoading: fetchingThreadMessages,
    isError: fetchThreadMessagesError,
    status: fetchThreadMessagesStatus,
  } = useQuery({
    queryKey: ["thread-messages", activeThreadId],
    queryFn: () => getThreadMessages(activeThreadId),
    enabled: !!activeThread,
    select: (data) => (data?.messages || []) as ChatMessage[],
  });

  const {
    mutate,
    isPending: sendMessageLoading,
    isError: isSendMessageError,
  } = useMutation({
    mutationFn: addMessageToThread,
    onSuccess: (result) => {
      const queryClient = new QueryClient();
      const currentData: any = queryClient.getQueryData([
        "thread-messages",
        activeThreadId || "",
      ]);
      setLastMessageId(result?.message._id.$oid);
      queryClient.setQueryData(["thread-messages", activeThreadId], {
        messages: [...(currentData?.messages || []), result?.message],
      });
    },
    onError: (e: AxiosError<any, any>) => {
      toast.error(e?.response?.data?.message || "Something went wrong!");
    },
    onSettled: () => {
      setTempMessage("");
    },
  });

  useEffect(() => {
    if (fetchThreadMessagesStatus === "success") {
      setMessages(fetchedMessages);
    }
  }, [fetchThreadMessagesStatus]);

  const sendMessage = (message: string, onSuccess?: () => void) => {
    setTempMessage(message);
    mutate(
      { sessionId: sessionId, message },
      {
        onSuccess: onSuccess ?? (() => {}),
      }
    );
  };

  const value = {
    messages,
    sendMessage,
    queryMode,
    setQueryMode,
    sessionId,
    setSessionId,
    activeThread,
    setActiveThread,
    fetchThreadMessagesLoading: fetchingThreadMessages,
    fetchThreadMessagesError,
    tempMessage,
    sendMessageLoading,
    isSendMessageError,
    lastMessageId,
    setLastMessageId,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext);
