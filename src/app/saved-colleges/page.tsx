import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function SavedCollegesPage() {
  const cookieStore = await cookies();

  const token = cookieStore.get("token")?.value;

  if (!token) {
    redirect("/login");
  }

  const payload = verifyToken(token) as {
    userId: string;
  };

  const savedColleges =
    await prisma.savedCollege.findMany({
      where: {
        userId: payload.userId,
      },
      include: {
        college: true,
      },
    });

  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold mb-4">
          Saved Colleges
        </h1>

        <p className="text-zinc-400 text-lg">
          Quickly access your favorite colleges.
        </p>
      </div>

      {savedColleges.length === 0 ? (
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold mb-4">
            No saved colleges yet
          </h2>

          <Link
            href="/"
            className="inline-block px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition"
          >
            Explore Colleges
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {savedColleges.map((item) => (
            <Link
              key={item.id}
              href={`/college/${item.college.id}`}
            >
              <div
                className="
                  backdrop-blur-lg
                  bg-white/5
                  border border-white/10
                  rounded-2xl
                  p-6
                  shadow-xl
                  hover:-translate-y-1
                  hover:scale-[1.02]
                  hover:shadow-blue-500/20
                  hover:shadow-2xl
                  hover:border-blue-500/40
                  hover:bg-white/10
                  transition-all
                  duration-300
                "
              >
                <h2 className="text-2xl font-bold mb-2">
                  {item.college.name}
                </h2>

                <p className="text-zinc-400 mb-4">
                  📍 {item.college.location}
                </p>

                <p className="mb-2">
                  ⭐ {item.college.rating}
                </p>

                <p>
                  💰 ₹
                  {item.college.fees.toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}