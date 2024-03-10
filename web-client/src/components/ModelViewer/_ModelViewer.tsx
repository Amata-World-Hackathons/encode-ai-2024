"use client";

import "@google/model-viewer";

export interface ModelViewerProps {
  alt?: string;
  className?: string;
  src: string;
  ar?: boolean;
  "environment-image"?: string;
  poster: string;
  "shadow-intensity"?: number;
  "camera-controls"?: boolean;
  "touch-action"?: "pan-y";
  "ar-modes"?: string;
}

export const _ModelViewer = ({ className, ...props }: ModelViewerProps) => {
  return <model-viewer class={className} {...props}></model-viewer>;
};
