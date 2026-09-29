import { useState } from "react";

const links = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  // Replace this with your real auth state (context, redux, etc.)
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleAuth = () => {
    setIsLoggedIn((prev) => !prev);
    setIsOpen(false);
  };

  const authButton = (
    <button
      onClick={handleAuth}
      className={`rounded-md px-4 py-2 text-sm font-medium text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 ${
        isLoggedIn
          ? "bg-red-600 hover:bg-red-700 focus-visible:ring-red-600"
          : "bg-indigo-600 hover:bg-indigo-700 focus-visible:ring-indigo-600"
      }`}
    >
      {isLoggedIn ? "Logout" : "Login"}
    </button>
  );

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Brand */}
        <a href="/" className="text-xl font-bold text-indigo-600">
          Todo App
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.name}>
              <a
                href={link.href}
                className="text-sm font-medium text-slate-600 transition-colors hover:text-indigo-600"
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop auth button */}
        <div className="hidden md:block">{authButton}</div>

        {/* Mobile menu toggle */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <svg
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white px-4 pb-4 md:hidden">
          <ul className="flex flex-col py-2">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="block rounded-md px-2 py-3 text-sm font-medium text-slate-600 hover:bg-slate-50 hover:text-indigo-600"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <div className="pt-2">{authButton}</div>
        </div>
      )}
    </nav>
  );
}