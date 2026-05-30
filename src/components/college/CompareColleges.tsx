"use client";

import { useState } from "react";
import { College } from "@/types/college";

interface Props {
  colleges: College[];
}

export default function CompareColleges({
  colleges,
}: Props) {
  const [college1Id, setCollege1Id] = useState("");
  const [college2Id, setCollege2Id] = useState("");

  const college1 = colleges.find(
    (college) => college.id === college1Id
  );

  const college2 = colleges.find(
    (college) => college.id === college2Id
  );

  return (
    <div>
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        {/* College 1 */}
        <select
          value={college1Id}
          onChange={(e) =>
            setCollege1Id(e.target.value)
          }
          className="border p-3 rounded-lg bg-zinc-900 text-white w-full"
        >
          <option value="" className="text-white">
            Select College 1
          </option>

          {colleges.map((college) => (
            <option
              key={college.id}
              value={college.id}
              className="text-white"
            >
              {college.name}
            </option>
          ))}
        </select>

        {/* College 2 */}
        <select
          value={college2Id}
          onChange={(e) =>
            setCollege2Id(e.target.value)
          }
          className="border p-3 rounded-lg bg-zinc-900 text-white w-full"
        >
          <option value="" className="text-white">
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
                className="text-white"
              >
                {college.name}
              </option>
            ))}
        </select>
      </div>

      {college1 && college2 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-700">
            <tbody>
              <tr className="border border-gray-700">
                <td className="p-4 font-bold">
                  Attribute
                </td>
                <td className="p-4 font-bold">
                  {college1.name}
                </td>
                <td className="p-4 font-bold">
                  {college2.name}
                </td>
              </tr>

              <tr className="border border-gray-700">
                <td className="p-4">
                  Location
                </td>
                <td className="p-4">
                  {college1.location}
                </td>
                <td className="p-4">
                  {college2.location}
                </td>
              </tr>

              <tr className="border border-gray-700">
                <td className="p-4">
                  Rating
                </td>
                <td className="p-4">
                  {college1.rating}
                </td>
                <td className="p-4">
                  {college2.rating}
                </td>
              </tr>

              <tr className="border border-gray-700">
                <td className="p-4">
                  Fees
                </td>
                <td className="p-4">
                  ₹
                  {college1.fees.toLocaleString()}
                </td>
                <td className="p-4">
                  ₹
                  {college2.fees.toLocaleString()}
                </td>
              </tr>

              <tr className="border border-gray-700">
                <td className="p-4">
                  Placements
                </td>
                <td className="p-4">
                  ₹
                  {college1.placements.toLocaleString()}
                </td>
                <td className="p-4">
                  ₹
                  {college2.placements.toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}