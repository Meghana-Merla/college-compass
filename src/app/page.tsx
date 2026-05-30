import CollegeCard from "@/components/college/CollegeCard";

async function getColleges() {
  const res = await fetch(
    "http://localhost:3000/api/colleges",
    {
      cache: "no-store",
    }
  );

  return res.json();
}

export default async function Home() {
  const colleges = await getColleges();

  return (
    <main className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold mb-8">
        College Compass
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {colleges.map((college: any) => (
          <CollegeCard
            key={college.id}
            college={college}
          />
        ))}
      </div>
    </main>
  );
}