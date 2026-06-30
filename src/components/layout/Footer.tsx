import Link from "next/link";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/10 bg-black/30">
      <div className="max-w-7xl mx-auto px-6 py-10">

        <div className="grid md:grid-cols-3 gap-10">

          <div>
            <h2 className="text-2xl font-bold text-blue-400">
              🎓 College Compass
            </h2>

            <p className="mt-3 text-zinc-400">
              Discover, compare and explore colleges across India with AI-powered insights.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Quick Links
            </h3>

            <div className="flex flex-col gap-2 text-zinc-400">
              <Link href="/">Home</Link>
              <Link href="/compare">Compare</Link>
              <Link href="/saved">Saved Colleges</Link>
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-4">
              Resources
            </h3>

            <div className="flex flex-col gap-2 text-zinc-400">
              <a
                href="https://www.nirfindia.org"
                target="_blank"
                rel="noopener noreferrer"
              >
                NIRF Rankings
              </a>

              <a
                href="https://www.ugc.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
              >
                UGC
              </a>

              <a
                href="https://www.aicte-india.org/"
                target="_blank"
                rel="noopener noreferrer"
              >
                AICTE
              </a>
            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm text-zinc-500">
          © {new Date().getFullYear()} College Compass. All rights reserved.
        </div>

      </div>
    </footer>
  );
}