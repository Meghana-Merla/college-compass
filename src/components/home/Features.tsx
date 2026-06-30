import {
  Search,
  Scale,
  Heart,
  Bot,
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Search",
    description:
      "Search colleges using name, state, fees, rankings and ratings.",
  },
  {
    icon: Scale,
    title: "Compare Colleges",
    description:
      "Compare colleges side-by-side to make informed decisions.",
  },
  {
    icon: Heart,
    title: "Save Favorites",
    description:
      "Bookmark your favourite colleges and access them anytime.",
  },
  {
    icon: Bot,
    title: "AI Assistant",
    description:
      "Get AI-powered answers, recommendations and college insights.",
  },
];

export default function Features() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12">

      <div className="text-center mb-14">

        <h2 className="text-4xl font-bold">
          Why Choose College Compass?
        </h2>

        <p className="mt-4 text-zinc-400 max-w-2xl mx-auto">
          Everything you need to discover, compare and choose the
          perfect college in one place.
        </p>

      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:border-blue-500/40 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center mb-6">

                <Icon className="w-7 h-7 text-blue-400" />

              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-zinc-400 leading-7">
                {feature.description}
              </p>

            </div>
          );
        })}

      </div>

    </section>
  );
}