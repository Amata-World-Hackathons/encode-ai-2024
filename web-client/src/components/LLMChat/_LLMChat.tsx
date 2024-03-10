import * as webllm from "@mlc-ai/web-llm";
import { GenerateProgressCallback } from "@mlc-ai/web-llm/lib/types";
import { useEffect, useState } from "react";

export const _LLMChat = () => {
  const [chat, setChat] = useState<webllm.ChatModule | undefined>();

  useEffect(() => {
    main();

    async function main() {
      const chat = new webllm.ChatModule();

      setChat(chat);

      chat.setInitProgressCallback((report) => {
        console.log("report", report);
      });

      await chat.reload("Llama-2-7b-chat-hf-q4f32_1");

      const chatProgressCallback: GenerateProgressCallback = (
        step,
        message
      ) => {
        console.log("hello", step, message);
      };

      const reply1 = await chat.generate(
        "hello, what is the weather like in London?",
        chatProgressCallback
      );
      console.log("REPLY:", reply1);

      const reply2 = await chat.generate(
        "How does that compare to Toronto Canada?",
        chatProgressCallback
      );
      console.log("REPLY:", reply2);

      console.log(await chat.runtimeStatsText());
    }
  }, []);

  return <div></div>;
};
