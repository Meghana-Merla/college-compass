"use client";

import { useMemo, useState } from "react";
import CollegeCard from "./CollegeCard";
import { College } from "@/types/college";

interface Props {
  colleges: College[];
}

export default function CollegeList({
  colleges,
}: Props) {
  const [search, setSearch] =
    useState("");

  const filteredColleges =
    useMemo(() => {
      const searchTerm = search
        .toLowerCase()
        .trim();

      return colleges.filter(
        (college) =>
          college.name
            .toLowerCase()
            .includes(searchTerm)
      );
    }, [search, colleges]);

  return (
    <>
      <div className="mb-10">
        <div className="relative">
          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400">
            🔍
          </span>

          <input
            type="text"
            placeholder="Search colleges..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="
              w-full
              pl-14
              pr-4
              py-4
              rounded-2xl
              bg-white/5
              backdrop-blur-lg
              border border-white/10
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
              transition-all
            "
          />
        </div>
      </div>

      {filteredColleges.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            No colleges found
          </h2>

          <p className="text-zinc-400 mt-2">
            Try another search term.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredColleges.map(
            (college) => (
              <CollegeCard
                key={college.id}
                college={college}
              />
            )
          )}
        </div>
      )}
    </>
  );
}