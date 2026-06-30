export default function Stats() {
  const stats = [
    {
      value: "1200+",
      label: "Colleges",
    },
    {
      value: "25+",
      label: "States",
    },
    {
      value: "AI",
      label: "Gemini Powered",
    },
    {
      value: "24×7",
      label: "College Assistance",
    },
  ];

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        {stats.map((stat) => (
          <div
            key={stat.label}
            className="
              rounded-3xl
              border
              border-white/10
              bg-white/5
              p-8
              text-center
              hover:bg-white/10
              transition
            "
          >
            <h2 className="text-4xl font-bold text-blue-400">
              {stat.value}
            </h2>

            <p className="mt-3 text-zinc-400">
              {stat.label}
            </p>
          </div>
        ))}

      </div>
    </section>
  );
}