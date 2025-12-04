"use client";
import Image from "next/image";

export default function MemesPage() {
  // Memes' urls
  const memes = [
    "https://i.pinimg.com/736x/62/68/be/6268be724ea32db482f1ab0a90e8c4ec.jpg",
    "https://i.pinimg.com/736x/3e/c2/90/3ec2903a46f13ef12d887a46327f2041.jpg",
    "https://i.pinimg.com/736x/f9/0e/33/f90e336024131eea9148aea4ee37efd4.jpg",
    "https://i.pinimg.com/736x/23/82/98/2382987e674e540c4981db30bd3ba3ab.jpg",
    "https://i.pinimg.com/736x/75/69/0a/75690a6623c8ddd96b6cac7d724bff53.jpg",
    "https://i.pinimg.com/736x/d7/e6/5c/d7e65c00d20b30c118dc5d29d63d27a9.jpg",
    "https://i.pinimg.com/736x/0a/49/67/0a49675d3efb6bd70f45e7421c1cfa84.jpg",
    "https://i.pinimg.com/736x/45/46/2b/45462bef9da39c24f6a88257bd42dbbc.jpg",
    "https://i.pinimg.com/736x/46/2c/c7/462cc7ef4fe0260f5247f06f95d6e16a.jpg",
    "https://i.pinimg.com/736x/2e/f9/78/2ef978f370026f7cad5018cd51aa8a97.jpg",
    "https://i.pinimg.com/736x/81/10/bc/8110bc36b0dd40e07e0009e226cacf61.jpg",
    "https://i.pinimg.com/736x/0d/24/a5/0d24a5411b6878a0eb0aed613a666d09.jpg"
  ];

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-3xl font-bold text-center mb-8">Kinematics Memes</h1>

      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
        {memes.map((url, i) => (
          <div key={i} className="break-inside-avoid">
            <Image src={url} alt="meme" width={600} height={600} className="w-full rounded-lg shadow-lg"/>
          </div>
        ))}
      </div>
    </main>
  );
}