import dynamic from "next/dynamic";

const LLMChat = dynamic(
  () => import("./_LLMChat").then((mod) => mod._LLMChat),
  { ssr: true }
);

export default LLMChat;
