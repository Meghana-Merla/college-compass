export default function SearchBar({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="mt-10 mb-12">
      <div className="relative">
        <span className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400">
          🔍
        </span>

        <input
          type="text"
          placeholder="Search colleges..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="
            w-full
            pl-14
            pr-4
            py-4
            rounded-2xl
            bg-white/5
            backdrop-blur-lg
            border border-white/10
            outline-none
            focus:border-blue-500
            focus:ring-2
            focus:ring-blue-500/20
            transition-all
          "
        />
      </div>
    </div>
  );
}