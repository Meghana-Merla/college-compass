import { cookies } from "next/headers";
import { verifyToken } from "@/lib/jwt";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function SavedCollegesPage() {
  const cookieStore = await cookies();

  const token =
    cookieStore.get("token")?.value;

  if (!token) {
    return (
      <div className="p-10">
        Please login first
      </div>
    );
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
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-5xl font-bold mb-8">
        Saved Colleges
      </h1>

      <div className="grid md:grid-cols-2 gap-6">
        {savedColleges.map((item) => (
          <Link
            key={item.id}
            href={`/college/${item.college.id}`}
            className="border rounded-xl p-5"
          >
            <h2 className="text-2xl font-bold">
              {item.college.name}
            </h2>

            <p>
              {item.college.location}
            </p>

            <p>
              ⭐ {item.college.rating}
            </p>
          </Link>
        ))}
      </div>
    </main>
  );
}