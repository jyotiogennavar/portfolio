import Link from "next/link";

const Navbar = () => {
  return (
    <header className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">JO</h1>
      <nav className="flex gap-x-4">
        <Link href="/about">About</Link>
        <Link href="/projects">Projects</Link>
        <Link href="/writings">Writings</Link>
      </nav>
    </header>
  );
};

export { Navbar };
