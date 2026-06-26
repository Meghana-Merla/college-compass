"use client";

import { useState } from "react";
import { College } from "@/types/college";

interface Props {
  colleges: College[];
}

export default function CompareColleges({
  colleges,
}: Props) {
  const [college1Id, setCollege1Id] =
    useState("");

  const [college2Id, setCollege2Id] =
    useState("");

  const college1 = colleges.find(
    (college) => college.id === college1Id
  );

  const college2 = colleges.find(
    (college) => college.id === college2Id
  );

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mb-10">
        <select
          value={college1Id}
          onChange={(e) =>
            setCollege1Id(e.target.value)
          }
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
            Select College 1
          </option>

          {colleges.map((college) => (
            <option
              key={college.id}
              value={college.id}
            >
              {college.name}
            </option>
          ))}
        </select>

        <select
          value={college2Id}
          onChange={(e) =>
            setCollege2Id(e.target.value)
          }
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
            Select College 2
          </option>

          {colleges
            .filter(
              (college) =>
                college.id !== college1Id
            )
            .map((college) => (
              <option
                key={college.id}
                value={college.id}
              >
                {college.name}
              </option>
            ))}
        </select>
      </div>

      {college1 && college2 && (
        <div className="grid lg:grid-cols-2 gap-8">

          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-4">
              {college1.name}
            </h2>

            <div className="space-y-3">
              <p>
                📍 {college1.city}, {college1.state}
              </p>

              <p>
                🏛️ {college1.type}
              </p>

              <p>
                ⭐ {college1.rating ?? "N/A"}
              </p>

              <p>
                🏆 NIRF Rank:{" "}
                {college1.nirfRank ?? "N/A"}
              </p>

              <p>
                💰{" "}
                {college1.fees
                  ? `₹${college1.fees.toLocaleString()}`
                  : "N/A"}
              </p>

              <p>
                📈{" "}
                {college1.averagePackage
                  ? `${college1.averagePackage} LPA`
                  : "N/A"}
              </p>
            </div>
          </div>

          <div className="backdrop-blur-lg bg-white/5 border border-white/10 rounded-3xl p-8">
            <h2 className="text-3xl font-bold mb-4">
              {college2.name}
            </h2>

            <div className="space-y-3">
              <p>
                📍 {college2.city}, {college2.state}
              </p>

              <p>
                🏛️ {college2.type}
              </p>

              <p>
                ⭐ {college2.rating ?? "N/A"}
              </p>

              <p>
                🏆 NIRF Rank:{" "}
                {college2.nirfRank ?? "N/A"}
              </p>

              <p>
                💰{" "}
                {college2.fees
                  ? `₹${college2.fees.toLocaleString()}`
                  : "N/A"}
              </p>

              <p>
                📈{" "}
                {college2.averagePackage
                  ? `${college2.averagePackage} LPA`
                  : "N/A"}
              </p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}