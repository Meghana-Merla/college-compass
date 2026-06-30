import { College } from "@/types/college";
import Link from "next/link";

interface CollegeCardProps {
  college: College;
}

export default function CollegeCard({
  college,
}: CollegeCardProps) {
  return (
    <Link href={`/college/${college.id}`}>
      <div
          className="
            group
            overflow-hidden
            rounded-3xl
            border border-white/10
            bg-gradient-to-b
            from-white/10
            to-white/5
            p-6
            shadow-xl
            backdrop-blur-xl
            transition-all
            duration-300
            hover:-translate-y-2
            hover:border-blue-500/40
            hover:shadow-blue-500/20
          "
        >
          {/* Badge */}
          <div className="mb-5 flex items-center justify-between">
            <span className="rounded-full bg-blue-500/15 px-3 py-1 text-xs font-semibold text-blue-300">
              {college.type}
            </span>

            <span className="rounded-full bg-yellow-500/15 px-3 py-1 text-xs font-semibold text-yellow-300">
              ⭐ {college.rating ?? "N/A"}
            </span>
          </div>

          {/* College Name */}
          <h2 className="line-clamp-2 text-2xl font-bold group-hover:text-blue-400 transition-colors">
            {college.name}
          </h2>

          <p className="mt-2 text-zinc-400">
            📍 {college.city}, {college.state}
          </p>

          {/* Stats */}
          <div className="mt-6 space-y-3">

            <div className="flex justify-between">
              <span className="text-zinc-400">🏆 NIRF Rank</span>
              <span className="font-semibold">
                {college.nirfRank ?? "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">💰 Fees</span>
              <span className="font-semibold">
                {college.fees
                  ? `₹${college.fees.toLocaleString()}`
                  : "N/A"}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-zinc-400">
                📈 Avg Package
              </span>
              <span className="font-semibold">
                {college.averagePackage
                  ? `${college.averagePackage} LPA`
                  : "N/A"}
              </span>
            </div>

          </div>

          {/* Button */}
          <div className="mt-8">

            <div
              className="
                w-full
                rounded-xl
                bg-gradient-to-r
                from-blue-600
                to-cyan-600
                py-3
                text-center
                font-semibold
                transition
                group-hover:bg-blue-700
                
              "
            >
              View Details →
            </div>

          </div>

        </div>
      
    </Link>
  );
}