"use client";

import { useCreator } from "@hooks/useCreator";
import Link from "next/link";
import { ReactNode } from "react";

export const _MyWorksLink = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const creatorId = useCreator();

  return (
    <Link href={`/creators/${creatorId}`} className={className}>
      {children}
    </Link>
  );
};
