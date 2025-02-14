import { ChatRequestOptions, Message } from 'ai';
import { PreviewMessage } from './message';
import { memo, useRef, useEffect  } from 'react';
import equal from 'fast-deep-equal';

interface MessagesProps {
  chatId: string;
  isLoading: boolean;
  messages: Array<Message>;
  setMessages: (
    messages: Message[] | ((messages: Message[]) => Message[]),
  ) => void;
  reload: (
    chatRequestOptions?: ChatRequestOptions,
  ) => Promise<string | null | undefined>;
  isReadonly: boolean;
}

function PureMessages({
  chatId,
  isLoading,
  messages,
  setMessages,
  reload,
  isReadonly,
}: MessagesProps) {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll logic
  useEffect(() => {
    if (messagesEndRef.current) {
    window.requestAnimationFrame(() => {
      setTimeout(() => {
        messagesEndRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "end",
        });
      }, 100);
    });
  }
}, [messages]); // Only runs when messages change

  return (
    <div
        className="flex flex-col flex-grow" ref={messagesContainerRef}>

      {messages.map((message, index) => (
        <PreviewMessage
          key={message.id}
          chatId={chatId}
          message={message}
          isLoading={isLoading && messages.length - 1 === index}
          setMessages={setMessages}
          reload={reload}
          isReadonly={isReadonly}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}

export const Messages = memo(PureMessages, (prevProps, nextProps) => {

  if (prevProps.isLoading !== nextProps.isLoading) return false;
  if (prevProps.isLoading && nextProps.isLoading) return false;
  if (prevProps.messages.length !== nextProps.messages.length) return false;
  if (!equal(prevProps.messages, nextProps.messages)) return false;

  return true;
});
