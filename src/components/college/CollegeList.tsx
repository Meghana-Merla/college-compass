"use client";

import { useEffect, useState } from "react";
import CollegeCard from "./CollegeCard";
import { College } from "@/types/college";

interface Props {
  colleges: College[];
}

interface ApiResponse {
  colleges: College[];
  total: number;
  page: number;
  totalPages: number;
}

export default function CollegeList({
  colleges: initialColleges,
}: Props) {
  const [colleges, setColleges] =
    useState(initialColleges);

  const [search, setSearch] =
    useState("");

  const [state, setState] =
    useState("");

  const [type, setType] =
    useState("");

  const [sort, setSort] =
    useState("");

  const [order, setOrder] =
    useState("asc");

  const [page, setPage] =
    useState(1);

  const [totalPages, setTotalPages] =
    useState(1);

  useEffect(() => {
    const fetchColleges = async () => {
      const res = await fetch(
        `/api/colleges?search=${search}&state=${state}&type=${type}&sort=${sort}&order=${order}&page=${page}`
      );

      const data: ApiResponse =
        await res.json();

      setColleges(data.colleges);
      setTotalPages(data.totalPages);
    };

    fetchColleges();
  }, [
    search,
    state,
    type,
    sort,
    order,
    page,
  ]);

  return (
    <>
      <div className="mb-10 space-y-4">

        <input
          type="text"
          placeholder="Search colleges..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="
            w-full
            p-4
            rounded-xl
            bg-zinc-900
            text-white
            placeholder:text-zinc-500
            border
            border-zinc-700
            outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
            transition-all
          "
        />

        <div className="grid md:grid-cols-2 gap-4">

          <select
            value={state}
            onChange={(e) => {
              setState(e.target.value);
              setPage(1);
            }}
            className="
              w-full
              p-4
              rounded-xl
              bg-zinc-900
              text-white
              border
              border-zinc-700
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
              transition-all
            "
          >
            <option value="">
              All States
            </option>

            <option>
              Andhra Pradesh
            </option>

            <option>
              Assam
            </option>

            <option>
              Bihar
            </option>

            <option>
              Chhattisgarh
            </option>

            <option>
              Delhi
            </option>

            <option>
              Goa
            </option>

            <option>
              Gujarat
            </option>

            <option>
              Haryana
            </option>

            <option>
              Himachal Pradesh
            </option>

            <option>
              Jammu & Kashmir
            </option>

            <option>
              Jharkhand
            </option>

            <option>
              Karnataka
            </option>

            <option>
              Kerala
            </option>

            <option>
              Madhya Pradesh
            </option>

            <option>
              Maharashtra
            </option>

            <option>
              Odisha
            </option>

            <option>
              Punjab
            </option>

            <option>
              Rajasthan
            </option>

            <option>
              Tamil Nadu
            </option>

            <option>
              Telangana
            </option>

            <option>
              Uttar Pradesh
            </option>

            <option>
              Uttarakhand
            </option>

            <option>
              West Bengal
            </option>
          </select>

          <select
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setPage(1);
            }}
            className="
              w-full
              p-4
              rounded-xl
              bg-zinc-900
              text-white
              border
              border-zinc-700
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
              transition-all
            "
          >
            <option value="">
              All Types
            </option>

            <option>
              IIT
            </option>

            <option>
              NIT
            </option>

            <option>
              IIIT
            </option>

            <option>
              Private
            </option>

            <option>
              Government
            </option>
          </select>

        </div>

        <div className="grid md:grid-cols-2 gap-4">

          <select
            value={sort}
            onChange={(e) => {
              setSort(e.target.value);
              setPage(1);
            }}
            className="
              w-full
              p-4
              rounded-xl
              bg-zinc-900
              text-white
              border
              border-zinc-700
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
              transition-all
            "
          >
            <option value="">
              Default Sorting
            </option>

            <option value="rating">
              Rating
            </option>

            <option value="fees">
              Fees
            </option>

            <option value="averagePackage">
              Average Package
            </option>

            <option value="nirfRank">
              NIRF Rank
            </option>

            <option value="name">
              Name
            </option>
          </select>

          <select
            value={order}
            onChange={(e) => {
              setOrder(e.target.value);
              setPage(1);
            }}
            className="
              w-full
              p-4
              rounded-xl
              bg-zinc-900
              text-white
              border
              border-zinc-700
              outline-none
              focus:border-blue-500
              focus:ring-2
              focus:ring-blue-500/20
              transition-all
            "
          >
            <option value="asc">
              Ascending
            </option>

            <option value="desc">
              Descending
            </option>
          </select>

        </div>

      </div>

      {colleges.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold">
            No colleges found
          </h2>

          <p className="text-zinc-400 mt-2">
            Try changing your search or filters.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {colleges.map((college) => (
            <CollegeCard
              key={college.id}
              college={college}
            />
          ))}
        </div>
      )}

      <div className="flex justify-center gap-4 mt-10">

        <button
          disabled={page === 1}
          onClick={() =>
            setPage(page - 1)
          }
          className="
            px-5
            py-2.5
            rounded-lg
            bg-zinc-900
            text-white
            border
            border-zinc-700
            hover:bg-zinc-800
            hover:border-blue-500
            transition-all
            disabled:opacity-40
          "
        >
          Previous
        </button>

        <span className="self-center">
          {page} / {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() =>
            setPage(page + 1)
          }
          className="
            px-5
            py-2.5
            rounded-lg
            bg-zinc-900
            text-white
            border
            border-zinc-700
            hover:bg-zinc-800
            hover:border-blue-500
            transition-all
            disabled:opacity-40
          "
        >
          Next
        </button>

      </div>
    </>
  );
}