import Link from "next/link";
import { Strong } from "../ui/Strong";

export default function Hero() {
  return (
    <main className="grid justify-center pt-40 text-center">
      <div className="space-y-1 pb-8 text-7xl">
        <h1 className="font-medium">Train Your Mind</h1>
        <h1 className="animate-gradient-x inline-block bg-gradient-to-r from-orange-500 to-pink-500 bg-[length:400%_100%] bg-clip-text pb-4 font-semibold text-transparent">
          Boost your IQ
        </h1>
      </div>
      {/* TODO: Balanced text */}
      <h2 className="max-w-2xl text-xl text-foreground/90">
        <Strong variant="primary">Cogniba</Strong> is an{" "}
        <Strong>open-source</Strong> tool based on the{" "}
        <Strong variant="link" className="hover:underline">
          <a
            href="https://en.wikipedia.org/wiki/N-back"
            target="_blank"
            rel="noopener noreferrer"
          >
            N-Back task
          </a>
        </Strong>
        , the only proven method to <Strong>enhance your IQ</Strong> through{" "}
        <Strong>science-backed training</Strong>.
      </h2>
    </main>
  );
}