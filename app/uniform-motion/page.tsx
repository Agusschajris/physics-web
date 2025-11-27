"use client";
import { useState } from "react";

export default function UniformMotionPage() {
  {/* Getting graph */}
  const [x_i, setX_i] = useState("");
  const [v, setV] = useState("");
  const [t_i, setT_i] = useState("");
  const [graph, setGraph] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("http://localhost:8000/UM", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        x_i: Number(x_i),
        v: Number(v),
        t_i: Number(t_i),
        t_f: 10
      })
    });

    const data = await res.json();
    setGraph(data.graph);
  };
  
  {/* Here starts what I actually see in the page */} 
  return (
    <main className="flex flex-col items-center min-h-screen py-10">
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

      {/* Input values for graph */}
      <div className="flex flex-col gap-4 w-64 mt-4">
        {/* Initial position */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-10 font-semibold">X₀:</span>
          <input type="number" className="border p-2 rounded w-32" value={x_i} onChange={(e) => setX_i(e.target.value)} />
          <span className="w-10 text-sm text-gray-400">m</span>
        </div>

        {/* Velocity */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-10 font-semibold">V:</span>
          <input type="number" className="border p-2 rounded w-32" value={v} onChange={(e) => setV(e.target.value)} />
          <span className="w-10 text-sm text-gray-400">m/s</span>
        </div>

        {/* Initial time */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-10 font-semibold">t₀:</span>
          <input type="number" className="border p-2 rounded w-32" value={t_i} onChange={(e) => setT_i(e.target.value)} />
          <span className="w-10 text-sm text-gray-400">s</span>
        </div>

        {/* Generate graph button */}
        <button onClick={handleGenerate}
          className="px-4 py-2 bg-violet-600 text-white rounded hover:bg-violet-800">
          Generate graph
        </button>
      </div>

      {/* Graph */}
      {graph && (<img src={`data:image/png;base64,${graph}`} alt="Uniform motion graph" className="mt-6"/>)}
      
    </main>
  );
}