import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/examples", label: "Examples" },
];

export function ReferenceNav() {
  return (
    <header className="border-b">
      <nav
        aria-label="Reference application"
        className="mx-auto flex max-w-3xl items-center gap-4 px-6 py-4 text-sm"
      >
        <span className="font-medium">atlas-reference-app</span>
        <ul className="flex flex-wrap gap-3 text-muted-foreground">
          {links.map((link) => (
            <li key={link.href}>
              <Link className="hover:text-foreground underline-offset-4 hover:underline" href={link.href}>
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
