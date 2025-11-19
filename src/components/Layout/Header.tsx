import Link from "next/link";

export function Header() {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <Link href="/">
        <h1 className="text-2xl font-bold text-gray-900">Perfect Resume Scan</h1>
      </Link>
    </header>
  );
}
