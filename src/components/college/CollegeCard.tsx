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
        backdrop-blur-lg
        bg-white/5
        border border-white/10
        rounded-2xl
        p-6
        shadow-xl
        hover:scale-105
        hover:border-blue-500/40
        hover:bg-white/10
        transition-all
        duration-300
        cursor-pointer
      "
      >
        <h2 className="text-2xl font-bold mb-2">
          {college.name}
        </h2>

        <p className="text-zinc-400 mb-4">
          📍 {college.location}
        </p>

        <div className="space-y-2">
          <p>
            ⭐ Rating:
            <span className="ml-2 font-semibold">
              {college.rating}
            </span>
          </p>

          <p>
            💰 Fees:
            <span className="ml-2 font-semibold">
              ₹{college.fees.toLocaleString()}
            </span>
          </p>

          <p>
            📈 Placement:
            <span className="ml-2 font-semibold">
              ₹{college.placements.toLocaleString()}
            </span>
          </p>
        </div>
      </div>
    </Link>
  );
}