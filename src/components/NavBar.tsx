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
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          href="/"
          className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"
        >
          🎓 College Compass
        </Link>

        <div className="flex items-center gap-6">

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
                  transition
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
                  transition
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
                transition
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