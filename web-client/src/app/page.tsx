import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <h1>The ARk Project</h1>

      <Link href="/explore" className="btn btn-primary">
        Explore
      </Link>

      <Link href="/characters/create" className="btn btn-primary">
        Start here
      </Link>
    </div>
  );
}
