import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const images = import.meta.glob("../assets/philosophers/*.{jpg,png}", {
  eager: true,
});

const philosophers = [
  {
    name: "Krishna",
    img: images["../assets/philosophers/krishna.png"]?.default,
  },
  {
    name: "Socrates",
    img: images["../assets/philosophers/socrates.png"]?.default,
  },
  { name: "Plato", img: images["../assets/philosophers/plato.png"]?.default },
  {
    name: "Aristotle",
    img: images["../assets/philosophers/aristotle.png"]?.default,
  },
  {
    name: "Confucius",
    img: images["../assets/philosophers/confucius.png"]?.default,
  },
  {
    name: "Nietzsche",
    img: images["../assets/philosophers/nietzsche.png"]?.default,
  },
  { name: "Kant", img: images["../assets/philosophers/kant.png"]?.default },
  {
    name: "Descartes",
    img: images["../assets/philosophers/descartes.png"]?.default,
  },
  {
    name: "Spinoza",
    img: images["../assets/philosophers/spinoza.png"]?.default,
  },
  {
    name: "Voltaire",
    img: images["../assets/philosophers/voltaire.png"]?.default,
  },
  {
    name: "Lao Tzu",
    img: images["../assets/philosophers/laotzu.png"]?.default,
  },
  {
    name: "Marcus Aurelius",
    img: images["../assets/philosophers/marcusaurelius.png"]?.default,
  },
  {
    name: "Diogenes",
    img: images["../assets/philosophers/diogenes.png"]?.default,
  },
  {
    name: "Epicurus",
    img: images["../assets/philosophers/epicurus.png"]?.default,
  },
  { name: "Hegel", img: images["../assets/philosophers/hegel.png"]?.default },
  { name: "Locke", img: images["../assets/philosophers/locke.png"]?.default },
  {
    name: "Rousseau",
    img: images["../assets/philosophers/rousseau.png"]?.default,
  },
  { name: "Sartre", img: images["../assets/philosophers/sartre.png"]?.default },
  { name: "Camus", img: images["../assets/philosophers/camus.png"]?.default },
  { name: "Thales", img: images["../assets/philosophers/thales.png"]?.default },
  {
    name: "Pythagoras",
    img: images["../assets/philosophers/pythagoras.png"]?.default,
  },
  {
    name: "Heraclitus",
    img: images["../assets/philosophers/heraclitus.png"]?.default,
  },
  { name: "Seneca", img: images["../assets/philosophers/seneca.png"]?.default },
  {
    name: "Francis Bacon",
    img: images["../assets/philosophers/francisbacon.png"]?.default,
  },
  { name: "Hume", img: images["../assets/philosophers/hume.png"]?.default },
  {
    name: "J.S. Mill",
    img: images["../assets/philosophers/jsmill.png"]?.default,
  },
  { name: "Pascal", img: images["../assets/philosophers/pascal.png"]?.default },
  {
    name: "Heidegger",
    img: images["../assets/philosophers/heidegger.png"]?.default,
  },
  {
    name: "Schopenhauer",
    img: images["../assets/philosophers/schopenhauer.png"]?.default,
  },
  {
    name: "Aquinas",
    img: images["../assets/philosophers/aquinas.png"]?.default,
  },
  {
    name: "Avicenna",
    img: images["../assets/philosophers/avicenna.png"]?.default,
  },
  {
    name: "Al-Farabi",
    img: images["../assets/philosophers/alfarabi.png"]?.default,
  },
  { name: "Zeno", img: images["../assets/philosophers/zeno.png"]?.default },
  {
    name: "Foucault",
    img: images["../assets/philosophers/foucault.png"]?.default,
  },
  {
    name: "Derrida",
    img: images["../assets/philosophers/derrida.png"]?.default,
  },
  {
    name: "De Beauvoir",
    img: images["../assets/philosophers/debeauvoir.png"]?.default,
  },
  {
    name: "Karl Marx",
    img: images["../assets/philosophers/karlmarx.png"]?.default,
  },
  { name: "Freud", img: images["../assets/philosophers/freud.png"]?.default },
  { name: "Jung", img: images["../assets/philosophers/jung.png"]?.default },
  {
    name: "Chomsky",
    img: images["../assets/philosophers/chomsky.png"]?.default,
  },
  {
    name: "Krishnamurti",
    img: images["../assets/philosophers/krishnamurti.png"]?.default,
  },
];

const PhilosopherCoin = ({ philosopher, onClick }) => {
  const [hovered, setHovered] = useState(false);
  const coinRef = useRef(null);

  return (
    <div style={{ position: "relative", width: 58, height: 58, flexShrink: 0 }}>
      <div
        ref={coinRef}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => onClick(philosopher.name)}
        style={{
          width: 58,
          height: 58,
          borderRadius: 16,
          cursor: "pointer",
          position: "absolute",
          top: 0,
          left: 0,
          transition: "all 0.25s cubic-bezier(0.34,1.56,0.64,1)",
          transform: hovered ? "scale(1.2) translateY(-4px)" : "scale(1)",
          zIndex: hovered ? 100 : 1,
          transformOrigin: "center center",
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 16,
            overflow: "hidden",
            position: "relative",
            padding: 2,
            background: `linear-gradient(135deg, #833AB4, #C13584, #E1306C, #FD1D1D, #F77737, #FCAF45)`,
            boxShadow: hovered
              ? `0 15px 35px rgba(225,48,108,0.45), 0 0 25px rgba(253,29,29,0.3)`
              : `0 8px 18px rgba(0,0,0,0.45)`,
          }}
        >
          <div
            style={{
              position: "absolute",
              inset: 2,
              borderRadius: 14,
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(8px)",
              zIndex: 1,
            }}
          />

          {philosopher.img ? (
            <img
              src={philosopher.img}
              alt={philosopher.name}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: 14,
                position: "relative",
                zIndex: 2,
              }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                borderRadius: 14,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
                padding: 4,
                fontSize: 9,
                color: "#fff",
                fontWeight: 600,
                background: `linear-gradient(135deg, #833AB4, #C13584, #E1306C, #FD1D1D, #F77737, #FCAF45)`,
              }}
            >
              {philosopher.name}
            </div>
          )}

          <div
            style={{
              position: "absolute",
              top: 4,
              left: 5,
              width: 25,
              height: 8,
              background: "rgba(255,255,255,0.35)",
              borderRadius: "50%",
              zIndex: 5,
            }}
          />
        </div>
      </div>

      {hovered && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: `linear-gradient(135deg, #833AB4, #C13584, #E1306C)`,
            color: "#fff",
            fontSize: 12,
            fontWeight: 600,
            padding: "6px 12px",
            borderRadius: 20,
            whiteSpace: "nowrap",
            boxShadow: "0 8px 20px rgba(225,48,108,0.4)",
            zIndex: 9999,
            pointerEvents: "none",
          }}
        >
          {philosopher.name}
        </div>
      )}
    </div>
  );
};

export default function PhilosopherGrid() {
  const navigate = useNavigate();

  // 👇 clean single function, no nesting, no old blocks
  const handlePhilosopherClick = (name) => {
    if (name === "Krishna") {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        columnGap: 12,
        rowGap: 12,
        padding: 30,
        justifyContent: "center",
        alignItems: "flex-start",
        alignContent: "flex-start",
        minHeight: "100vh",
        background: `
          radial-gradient(circle at top left, rgba(131,58,180,0.25), transparent 35%),
          radial-gradient(circle at bottom right, rgba(253,29,29,0.20), transparent 40%),
          #0b0b14
        `,
      }}
    >
      {philosophers.map((philosopher, index) => (
        <PhilosopherCoin
          key={index}
          philosopher={philosopher}
          onClick={handlePhilosopherClick}
        />
      ))}
    </div>
  );
}
