"use client";

import Link from "next/link";
import { ReactNode } from "react";
import dynamic from "next/dynamic";

const MyWorksLink = dynamic(
  () => import("./_MyWorksLink").then((mod) => mod._MyWorksLink),
  {
    ssr: false,
    loading: () => <div className="btn btn-ghost">My Works</div>,
  }
);

export default function StandardLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <header className="h-20 bg-white flex flex-row items-center">
        <div>
          <Link href="/" className="px-4">
            The Project ARk
          </Link>
        </div>

        <div className="flex-1"></div>

        <div className="flex flex-row mx-4 items-center gap-2">
          <Link href="/projects" className="btn btn-ghost">
            All Projects
          </Link>

          <MyWorksLink className="btn btn-ghost">My Works</MyWorksLink>

          <Link href="/projects/new" className="btn btn-primary">
            Create
          </Link>
        </div>
      </header>

      <main>{children}</main>
    </div>
  );
}
