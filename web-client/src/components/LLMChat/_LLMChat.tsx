import * as webllm from "@mlc-ai/web-llm";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";

import placeholderAI from "@assets/images/placeholder_ai.jpeg";
import placeholderUser from "@assets/images/profile-placeholder.webp";
import { Loader } from "@components/Loader";
import { useForm } from "react-hook-form";

export interface LLMChatProps {
  name: string;
  avatarUrl: string;
  backstory: string;
  className?: string;
}

export const _LLMChat = ({
  name,
  backstory,
  avatarUrl,
  className,
}: LLMChatProps) => {
  const { register, handleSubmit, reset, watch } = useForm({
    defaultValues: {
      message: "",
    },
  });
  const message = watch("message");

  const [chat, setChat] = useState<webllm.ChatModule | undefined>();
  const chatRef = useRef(chat);
  chatRef.current = chat;

  const [chatHistory, setChatHistory] = useState<
    { user: boolean; message: string; timestamp: number }[]
  >([]);

  const [aiTypingResponse, setAITypingResponse] = useState("");

  const sendMessage = useCallback(
    (message: string) => {
      if (!chatRef.current) return;

      setChatHistory((history) => [
        ...history,
        { user: true, message, timestamp: new Date().getTime() },
      ]);

      setAITypingResponse(" ");

      const preprompt = `
          From now on, you will respond to all questions as ${name}. Also use the
          following text as your background/backstory:

          ${backstory.substring(0, 1000)}

          For the following question, please respond in character:

        `;

      chatRef.current
        .generate(
          `
          ${preprompt}

          ${message}
          `,
          (step, message) => {
            console.log("step", step);
            setAITypingResponse(message);
          }
        )
        .then((completeResponse) => {
          setAITypingResponse("");
          setChatHistory((history) => [
            ...history,
            {
              user: false,
              message: completeResponse,
              timestamp: new Date().getTime(),
            },
          ]);
        });
    },
    [name, backstory]
  );

  const mref = useRef(sendMessage);
  mref.current = sendMessage;

  useEffect(() => {
    if (chatRef.current) return;

    const chat = new webllm.ChatModule();
    chatRef.current = chat;

    main();

    async function main() {
      chat.setInitProgressCallback((report) => {
        console.log("report", report);
      });

      await chat.reload("Llama-2-7b-chat-hf-q4f32_1");

      setChat(chat);

      setTimeout(() => {
        mref.current("How are you?");
      }, 500);
    }
  }, []);

  return (
    <div className={classNames("p-4", className)}>
      {!chat ? <Loader className="mx-auto" /> : null}

      {chatHistory.map(({ user, message }, index) => (
        <div
          key={index}
          className={classNames("chat", user ? "chat-end" : "chat-start")}
        >
          <div className="chat-image avatar">
            <div className="w-10 h-10 rounded-full">
              <img
                src={
                  user ? placeholderUser.src : avatarUrl || placeholderAI.src
                }
                alt={user ? "user profile pic" : name}
              />
            </div>
          </div>

          <div className="chat-header">
            {user ? "You" : name}
            {/* <time class="text-xs opacity-50">12:46</time> */}
          </div>

          <div className="chat-bubble">{message}</div>
        </div>
      ))}

      {aiTypingResponse ? (
        <div className="chat chat-start">
          <div className="chat-image avatar">
            <div className="w-10 h-10 rounded-full">
              <img src={avatarUrl || placeholderAI.src} alt={name} />
            </div>
          </div>

          <div className="chat-header">
            {name}
            {/* <time class="text-xs opacity-50">12:46</time> */}
          </div>

          <div className="chat-bubble">{aiTypingResponse}</div>
          <div className="chat-footer opacity-50">Typing</div>
        </div>
      ) : null}

      <form
        onSubmit={(ev) => {
          handleSubmit(({ message }) => {
            reset();
            sendMessage(message);
          })(ev).catch((err) => console.error(err));
        }}
        className="join w-full mt-8"
      >
        <textarea
          rows={1}
          className="input input-bordered join-item flex-1"
          {...register("message")}
        />
        <button className="btn join-item rounded-r-full" disabled={!message}>
          Send
        </button>
      </form>
    </div>
  );
};
