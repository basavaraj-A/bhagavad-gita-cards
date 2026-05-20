import React from "react";

const philosophers = [
  "Socrates",
  "Plato",
  "Aristotle",
  "Confucius",
  "Nietzsche",
  "Kant",
  "Descartes",
  "Spinoza",
  "Voltaire",
  "Lao Tzu",
  "Marcus Aurelius",
  "Diogenes",
  "Epicurus",
  "Hegel",
  "Locke",
  "Rousseau",
  "Sartre",
  "Camus",
  "Thales",
  "Pythagoras",
  "Heraclitus",
  "Seneca",
  "Bacon",
  "Hume",
  "Mill",
  "Pascal",
  "Heidegger",
  "Schopenhauer",
  "Aquinas",
  "Avicenna",
  "Al-Farabi",
  "Zeno",
  "Foucault",
  "Derrida",
  "Simone de Beauvoir",
  "Karl Marx",
  "Freud",
  "Jung",
  "Chomsky",
  "Krishnamurti",
];

export default function PhilosopherGrid() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-6 overflow-hidden">
      <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-4">
        {philosophers.map((name, index) => (
          <div
            key={index}
            className="group relative w-16 h-16 rounded-2xl cursor-pointer transition-all duration-300 hover:scale-125 hover:rotate-3 shadow-lg"
            style={{
              background:
                "linear-gradient(135deg, #f58529, #dd2a7b, #8134af, #515bd4)",
            }}
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-2xl blur-md opacity-40 group-hover:opacity-100 transition duration-300 bg-gradient-to-br from-pink-500 via-purple-500 to-blue-500"></div>

            {/* Main Box */}
            <div className="relative z-10 w-full h-full rounded-2xl flex items-center justify-center border border-white/20 backdrop-blur-sm">
              <span className="text-white text-[10px] opacity-0 group-hover:opacity-100 transition duration-300 text-center px-1 font-semibold">
                {name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}