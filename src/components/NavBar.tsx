"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", {
      method: "POST",
    });

    window.location.href = "/login";
  };

  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/me");
      const data = await res.json();

      setAuthenticated(data.authenticated);
    };

    checkAuth();
  }, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
        >
          <span className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
            College Compass
          </span>
        </Link>

        <div className="flex items-center gap-8">

          <Link
            href="/"
            className="hover:text-blue-400 transition"
          >
            Home
          </Link>

          <Link
            href="/compare"
            className="hover:text-blue-400 transition"
          >
            Compare
          </Link>

          <Link
            href="/about"
            className="hover:text-blue-400 transition"
          >
            About
          </Link>

          <Link
            href="/contact"
            className="hover:text-blue-400 transition"
          >
            Contact
          </Link>

          {authenticated && (
            <Link
              href="/saved-colleges"
              className="hover:text-blue-400 transition"
            >
              Saved
            </Link>
          )}

          {!authenticated ? (
            <>
              <Link
                href="/login"
                className="
                  px-4 py-2
                  rounded-xl
                  border border-white/10
                  hover:bg-white/10
                  hover:scale-105
                  transition-all
                  duration-300
                "
              >
                Login
              </Link>

              <Link
                href="/signup"
                className="
                  px-4 py-2
                  rounded-xl
                  bg-gradient-to-r
                  from-blue-600
                  to-cyan-600
                  hover:opacity-90
                  hover:scale-105
                  transition-all
                  duration-300
                  shadow-lg

                "
              >
                Register
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="
                px-4 py-2
                rounded-xl
                bg-red-600
                hover:bg-red-700
                hover:scale-105
                transition-all
                duration-300
              "
            >
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
}