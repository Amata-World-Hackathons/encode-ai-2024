"use client";

import { useParams } from "next/navigation";

export default function CreatorPage() {
  const { creatorId } = useParams<{ creatorId: string }>();

  return (
    <div>
      <section>
        <h1 className="text-4xl text-center">Works by {creatorId}</h1>
      </section>
    </div>
  );
}
