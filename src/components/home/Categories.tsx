
const categories = [
  {
    title: "IITs",
    icon: "🏛️",
    desc: "Premier engineering institutes",
  },
  {
    title: "NITs",
    icon: "🎓",
    desc: "National Institutes of Technology",
  },
  {
    title: "IIITs",
    icon: "💻",
    desc: "Top institutes for Computer Science",
  },
  {
    title: "Private Colleges",
    icon: "🏢",
    desc: "Leading private universities",
  },
];

export default function Categories() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-16">

      <div className="text-center mb-12">

        <h2 className="text-4xl font-bold">
          Explore by Category
        </h2>

        <p className="text-zinc-400 mt-3">
          Browse colleges based on institute type.
        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

        {categories.map((category) => (
          <div
            key={category.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 hover:border-blue-500 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 cursor-pointer"
            >
            <div className="text-5xl mb-5">
              {category.icon}
            </div>

            <h3 className="text-2xl font-semibold mb-2">
              {category.title}
            </h3>

            <p className="text-zinc-400">
              {category.desc}
            </p>

          </div>
        ))}

      </div>

    </section>
  );
}