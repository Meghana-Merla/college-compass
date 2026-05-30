"use client";

import { useMemo, useState } from "react";
import CollegeCard from "./CollegeCard";
import { College } from "@/types/college";
import SearchBar from "./SearchBar";

interface Props {
  colleges: College[];
}

export default function CollegeList({
  colleges,
}: Props) {
  const [search, setSearch] = useState("");

  const filteredColleges = useMemo(() => {
    const searchTerm = search.toLowerCase().trim();

    return colleges.filter((college) =>
        college.name
        .toLowerCase()
        .startsWith(searchTerm)
    );
    }, [search, colleges]);

  return (
    <>
      <SearchBar
        value={search}
        onChange={setSearch}
      />

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredColleges.map((college) => (
          <CollegeCard
            key={college.id}
            college={college}
          />
        ))}
      </div>
    </>
  );
}