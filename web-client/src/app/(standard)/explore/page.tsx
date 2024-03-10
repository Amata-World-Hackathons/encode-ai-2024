import Link from "next/link";

export default function ExplorePage() {
  return (
    <div>
      <Link href="/explore/assets" className="btn btn-primary">
        Explore more assets
      </Link>
    </div>
  );
}
