import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>Create a character</h1>

      <Link href="/characters/create" className="btn btn-primary">
        Start here
      </Link>
    </div>
  );
}
