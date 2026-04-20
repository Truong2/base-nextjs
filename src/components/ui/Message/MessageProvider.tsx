"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { createPortal } from "react-dom";
import { Message, MessageType } from "./Message";
import { setMessageInstance } from "~/utils/message";
import { useTranslations } from "next-intl";

export interface MessageConfig {
  top?: number;
  duration?: number;
  maxCount?: number;
}

export interface MessageInstance {
  success: (content: string, duration?: number) => void;
  error: (content: string, duration?: number) => void;
  warning: (content: string, duration?: number) => void;
  info: (content: string, duration?: number) => void;
  loading: (content: string, duration?: number) => void;
  destroy: () => void;
}

interface MessageItem {
  id: string;
  type: MessageType;
  content: string;
  duration: number;
}

interface MessageContextType {
  message: MessageInstance;
}

const MessageContext = createContext<MessageContextType | null>(null);

export const useMessage = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context.message;
};

interface MessageProviderProps {
  children: React.ReactNode;
  config?: MessageConfig;
}

const MessageContainer: React.FC<{
  messages: MessageItem[];
  config: MessageConfig;
  onRemove: (id: string) => void;
}> = ({ messages, config, onRemove }) => {
  const { top = 8, maxCount = 10 } = config;

  return (
    <div
      className="fixed left-1/2 z-50 flex -translate-x-1/2 flex-col items-center gap-2"
      style={{ top: `${top}px` }}
    >
      {messages.slice(0, maxCount).map(message => (
        <Message
          key={message.id}
          type={message.type}
          content={message.content}
          duration={message.duration}
          onClose={() => onRemove(message.id)}
        />
      ))}
    </div>
  );
};

export const MessageProvider: React.FC<MessageProviderProps> = ({
  children,
  config = {},
}) => {
  const t = useTranslations();
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  const removeMessage = useCallback((id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  }, []);

  const addMessage = useCallback(
    (type: MessageType, content: string, duration?: number) => {
      const id = Math.random().toString(36).substr(2, 9);
      const message: MessageItem = {
        id,
        type,
        content,
        duration: duration ?? config.duration ?? 3,
      };

      setMessages(prev => [...prev, message]);
    },
    [config.duration]
  );

  const messageInstance: MessageInstance = {
    success: (content: string, duration?: number) => {
      // Check if content is already translated (contains non-ASCII characters) or is a translation key
      const translatedContent =
        content.includes(".") && !/[^\x00-\x7F]/.test(content)
          ? t(content)
          : content;
      addMessage("success", translatedContent, duration);
    },
    error: (content: string, duration?: number) => {
      const translatedContent =
        content.includes(".") && !/[^\x00-\x7F]/.test(content)
          ? t(content)
          : content;
      addMessage("error", translatedContent, duration);
    },
    warning: (content: string, duration?: number) => {
      const translatedContent =
        content.includes(".") && !/[^\x00-\x7F]/.test(content)
          ? t(content)
          : content;
      addMessage("warning", translatedContent, duration);
    },
    info: (content: string, duration?: number) => {
      const translatedContent =
        content.includes(".") && !/[^\x00-\x7F]/.test(content)
          ? t(content)
          : content;
      addMessage("info", translatedContent, duration);
    },
    loading: (content: string, duration?: number) => {
      const translatedContent =
        content.includes(".") && !/[^\x00-\x7F]/.test(content)
          ? t(content)
          : content;
      addMessage("loading", translatedContent, duration);
    },
    destroy: () => setMessages([]),
  };

  useEffect(() => {
    setIsMounted(true);
    // Set message instance for use in httpClient
    setMessageInstance(messageInstance);
  }, []);

  return (
    <MessageContext.Provider value={{ message: messageInstance }}>
      {children}
      {isMounted &&
        createPortal(
          <MessageContainer
            messages={messages}
            config={config}
            onRemove={removeMessage}
          />,
          document.body
        )}
    </MessageContext.Provider>
  );
};
