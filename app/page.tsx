import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {/* Title */}
      <h1 className="text-4xl font-bold">
        Physics calculator ⚛️
      </h1>
      
      {/* Description */}
      <p className="mt-4 text-lg">
        1D kinematics simulator
      </p>

      {/* Buttons */}
      <div className="flex gap-4 mt-6">
        {/* Uniform motion */}
        <Link href="/uniform-motion">
          <button className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-800 transition">
            Uniform Motion
          </button>
        </Link>

        {/* Constant acceleration */}
        <Link href="/constant-acceleration">
          <button className="px-6 py-3 bg-violet-600 text-white rounded-xl hover:bg-violet-800 transition">
            Constant Acceleration
          </button>
        </Link>
      </div>

    {/* Credits */}
      <p className="mt-6 text-sm">
        By Agustina S. G.
      </p>

    </main>
  );
}