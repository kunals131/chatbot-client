import { createContext, useContext, useEffect, useState } from "react";
import { ChatMessage, QueryModes, Thread } from "./Chat.types";
import { addMessageToThread, getThreadMessages } from "./Chat.api";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const scrollToBottomOfMessageContainer = () => {
  const messageContainer = document.getElementById("messages-container-end");
  if (!messageContainer) return;
  setTimeout(() => {
    messageContainer?.scrollIntoView({ behavior: "smooth" });
  });
};

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
  setIsNewThread: (val: boolean) => void;
  isNewThread: boolean;
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
  setIsNewThread: () => {},
  isNewThread: false,
});

export const ChatContextProvider = ({ children }: any) => {
  const [queryMode, setQueryMode] = useState<QueryModes>(QueryModes.PERCISE);
  const [sessionId, setSessionId] = useState("");
  const [activeThread, setActiveThread] = useState<Thread | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [tempMessage, setTempMessage] = useState("");
  const [lastMessageId, setLastMessageId] = useState("");
  const activeThreadId = activeThread?._id?.$oid || "";
  const queryClient = useQueryClient();
  const [isNewThread, setIsNewThread] = useState(false);

  const handleIsNewThread = (value: boolean) => {
    if (!value) return setIsNewThread(false);
    setActiveThread(null);
    setIsNewThread(true);
    setSessionId("");
  };

  useEffect(() => {
    if (activeThread) {
      setSessionId(activeThread?.sessionId || "");
    }
  }, [activeThread]);

  const {
    data: fetchedMessages,
    isPending: fetchThreadMessagesLoading,
    isError: fetchThreadMessagesError,
  } = useQuery({
    queryKey: ["thread-messages", { activeThreadId: activeThread?._id?.$oid }],
    queryFn: () => getThreadMessages(activeThreadId),
    retry: false,
    enabled: !!activeThread,
    select: (data) => (data?.messages || []) as ChatMessage[],
  });

  const {
    mutate: sendMessageMutate,
    isPending: sendMessageLoading,
    isError: isSendMessageError,
  } = useMutation({
    mutationFn: addMessageToThread,
    onSuccess: (data) => {
      setTempMessage("");
      setLastMessageId(data?.message._id.$oid);
      setIsNewThread(false);
      if (data?.isNewThread) {
        setActiveThread(data?.thread);
        queryClient.setQueryData(["message-threads"], (oldData: any) => {
          console.log(oldData, "Old threads!");
          return {
            threads: [
              data?.thread,
              ...(oldData?.threads?.filter(
                (thread: any) => thread?._id?.$oid !== data?.thread?._id?.$oid
              ) || []),
            ],
          };
        });
      }
      queryClient.setQueryData(
        ["thread-messages", { activeThreadId: data?.thread?._id?.$oid }],
        (oldData: any) => {
          console.log(oldData);
          return {
            messages: [...(oldData?.messages || []), data?.message],
          };
        }
      );
      scrollToBottomOfMessageContainer();
    },
    onError: (e: AxiosError<any, any>) => {
      toast.error(e?.response?.data?.message || "Something went wrong!");
    },
    onSettled: () => setTempMessage(""),
  });

  useEffect(() => {
    scrollToBottomOfMessageContainer();
  }, [tempMessage, fetchedMessages?.length]);

  const sendMessage = (message: string) => {
    setTempMessage(message);
    if (activeThread) {
      queryClient.setQueryData(["message-threads"], (oldData: any) => {
        return {
          threads: [
            activeThread,
            ...(oldData?.threads?.filter(
              (thread: any) => thread?._id?.$oid !== activeThread?._id?.$oid
            ) || []),
          ],
        };
      });
    }
    sendMessageMutate({
      message,
      sessionId,
      queryMode
    });
  };

  const value = {
    messages: fetchedMessages || [],
    sendMessage,
    queryMode,
    setQueryMode,
    sessionId,
    setSessionId,
    activeThread,
    setActiveThread,
    fetchThreadMessagesLoading: fetchThreadMessagesError && !isNewThread,
    fetchThreadMessagesError,
    tempMessage,
    sendMessageLoading,
    isSendMessageError,
    lastMessageId,
    setLastMessageId,
    isNewThread,
    setIsNewThread: handleIsNewThread,
  };
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => useContext(ChatContext);
