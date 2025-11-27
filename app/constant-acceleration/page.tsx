"use client";
import { useState } from "react";

export default function ConstantAccelerationPage() {
  {/* Getting graph */}
  const [x_i, setX_i] = useState("");
  const [v_i, setV_i] = useState("");
  const [a, setA] = useState("");
  const [t_i, setT_i] = useState("");
  const [graph, setGraph] = useState("");

  const handleGenerate = async () => {
    const res = await fetch("http://localhost:8000/CA", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        x_i: Number(x_i),
        v_i: Number(v_i),
        a : Number(a),
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
        Constant Acceleration (Variable Velocity)
      </h1>

      {/* Description */}
      <p className="mt-4 text-base max-w-prose text-center">
        "Constant Acceleration" is a more sophisticated version of Uniform Motion, since now the velocity abandons the constants gang and joins the variables, so now we have two formulas (which means two different graphs!**): one for the position of the object and another one for its speed. And we also have a new character that joins the constants gang: acceleration.
      </p>

      {/* Formulas */}
      <p className="mt-4 text-lg font-bold italic max-w-prose text-center">
        X(t) = X₀ + V₀·(t - t₀) + 1/2·a·(t - t₀)² <br />
        V(t) = V₀ + a·(t - t₀)
      </p>

      {/* Formula description */}
      <p className="mt-4 text-base max-w-prose text-center">
        Where <span className="font-bold italic">X₀</span> is the initial position of the object, <span className="font-bold italic">V₀</span> is its initial velocity, <span className="font-bold italic">a</span> is its acceleration, and <span className="font-bold italic">t₀</span> is the initial time.
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
          <input type="number" className="border p-2 rounded w-32" value={v_i} onChange={(e) => setV_i(e.target.value)} />
          <span className="w-10 text-sm text-gray-400">m/s</span>
        </div>

        {/* Acceleration */}
        <div className="flex items-center justify-center gap-2">
          <span className="w-10 font-semibold">a:</span>
          <input type="number" className="border p-2 rounded w-32" value={a} onChange={(e) => setA(e.target.value)} />
          <span className="w-10 text-sm text-gray-400">m/s²</span>
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
          Generate position graph
        </button>
      </div>

      {/* Position graph */}
      {graph && (<img src={`data:image/png;base64,${graph}`} alt="Constant acceleration position graph" className="mt-6"/>)}
      
      {/* Clarification */}
      <p className="mt-4 text-base max-w-prose text-center">
        ** Actually, we also have a graph for velocity in Uniform Motion, but here we don't take it into account since the graph of a constant is just a horizontal straight line that doesn't give us much useful information.
      </p>

    </main>
  );
}