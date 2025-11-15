export default function UniformMotionPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      {/* Title */}
      <h1 className="text-3xl font-bold mb-4">
        Uniform Motion (Constant Velocity)
      </h1>

      {/* Description */}
      <p className="mt-4 text-base max-w-prose text-center">
        "Uniform Motion" is a 1D motion in which an object moves at constant speed and (as Newton helpfully reminds us) will never stop moving unless something stops it. This is the formula we use to calculate the position of the object as a function of time:
      </p>

      {/* Formula */}
      <p className="mt-4 text-lg font-bold italic max-w-prose text-center">
        X(t) = X₀ + V·(t - t₀)
      </p>

      {/* Formula description */}
      <p className="mt-4 text-base max-w-prose text-center">
        Where <span className="font-bold italic">X₀</span> is the initial position of the object, <span className="font-bold italic">V</span> is its velocity, and <span className="font-bold italic">t₀</span> is the initial time.
      </p>

    </main>
  );
}