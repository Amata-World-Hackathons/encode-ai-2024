import dynamic from "next/dynamic";

export type { ModelViewerProps } from "./_ModelViewer";

export const ModelViewer = dynamic(
  () => import("./_ModelViewer").then((mod) => mod._ModelViewer),
  {
    ssr: false,
  }
);
