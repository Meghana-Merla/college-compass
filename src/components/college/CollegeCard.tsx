import { College } from "@/types/college";

interface CollegeCardProps {
  college: College;
}

export default function CollegeCard({
  college,
}: CollegeCardProps) {
  return (
    <div className="border rounded-xl p-5 shadow-sm hover:shadow-md transition">
      <h2 className="text-xl font-bold">
        {college.name}
      </h2>

      <p className="text-gray-600">
        {college.location}
      </p>

      <div className="mt-3 space-y-1">
        <p>⭐ Rating: {college.rating}</p>
        <p>💰 Fees: ₹{college.fees.toLocaleString()}</p>
        <p>📈 Placement: ₹{college.placements.toLocaleString()}</p>
      </div>
    </div>
  );
}