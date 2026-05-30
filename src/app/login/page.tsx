"use client";

import Link from "next/link";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    const res = await fetch(
      "/api/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await res.json();

    alert(
      data.message || data.error
    );
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-6">

      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-cyan-600/20 blur-3xl" />

      <div
        className="
          relative
          w-full
          max-w-md
          backdrop-blur-xl
          bg-white/5
          border
          border-white/10
          rounded-3xl
          p-8
          shadow-2xl
        "
      >
        <h1 className="text-4xl font-bold text-center mb-2">
          Welcome Back
        </h1>

        <p className="text-zinc-400 text-center mb-8">
          Login to continue
        </p>

        <form
          onSubmit={handleLogin}
          className="space-y-4"
        >
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              p-4
              rounded-xl
              bg-white/5
              border
              border-white/10
              outline-none
              focus:border-blue-500
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full
              p-4
              rounded-xl
              bg-white/5
              border
              border-white/10
              outline-none
              focus:border-blue-500
            "
          />

          <button
            type="submit"
            className="
              w-full
              py-4
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-600
              hover:opacity-90
              transition
              font-semibold
            "
          >
            Login
          </button>
        </form>

        <p className="text-center text-zinc-400 mt-6">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-blue-400 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
    </main>
  );
}