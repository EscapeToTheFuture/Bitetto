import React, { useState, useEffect, useRef } from "react";
import ImageMapper from "react-img-mapper";
import Dialogue from "../components/Dialogue";
import { useNavigate } from "react-router";
import Segrete from "../assets/images/backGrounds/segrete/Segrete.png";
import messSegreto from "../assets/images/backGrounds/segrete/MessaggioSegreto.png";
import Button from "../components/Button";
import basement from "../assets/sounds/generic/basement.mp3";
import paper from "../assets/sounds/generic/paper.mp3";

const preloadImage = (src) =>
  new Promise((resolve) => {
    const img = new window.Image();
    img.onload = resolve;
    img.onerror = resolve;
    img.src = src;
  });

const preloadAudio = (src) =>
  new Promise((resolve) => {
    const audio = new window.Audio();
    audio.oncanplaythrough = resolve;
    audio.onerror = resolve;
    audio.src = src;
  });

const Scena3 = () => {
  const scenes = {
    0: { id: 0, src: Segrete },
    1: { id: 1, src: messSegreto },
  };

  const dialoghi = {
    dialogue: [
      {
        type: "narrator",
        text: "Per terra trova un bigliettino con una lente",
      },
    ],
  };

  const [bgImage, setBgImage] = useState(0);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showButtons, setShowButtons] = useState(false); // Stato per mostrare i pulsanti con ritardo
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const basementAudioRef = useRef(new Audio(basement)); // Riferimento per l'audio

  // Riproduci il suono "basement" in loop all'inizio della scena
  useEffect(() => {
    const audio = basementAudioRef.current;
    audio.volume = 0.5; // Imposta il volume iniziale
    audio.loop = true; // Riproduzione in loop
    audio
      .play()
      .then(() => {
        console.log("Basement audio avviato correttamente");
      })
      .catch((error) => {
        console.error("Errore nella riproduzione di basement:", error);
      });

    return () => {
      audio.pause(); // Pausa il suono quando il componente viene smontato
      audio.currentTime = 0; // Resetta il suono
    };
  }, []);

  // Mostra i pulsanti con un ritardo di 1 secondo quando bgImage è 1
  useEffect(() => {
    if (bgImage === 1) {
      const timer = setTimeout(() => {
        setShowButtons(true); // Mostra i pulsanti dopo 1 secondo
      }, 3000);

      return () => clearTimeout(timer); // Pulisci il timer quando il componente viene smontato
    } else {
      setShowButtons(false); // Nascondi i pulsanti se bgImage cambia
    }
  }, [bgImage]);

  useEffect(() => {
    Promise.all([
      preloadImage(Segrete),
      preloadImage(messSegreto),
    ]).then(() => setLoading(false));
  }, []);

  const handleDialogueClose = () => {
    if (currentDialogueIndex < dialoghi.dialogue.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h1>Caricamento...</h1>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {currentDialogueIndex < dialoghi.dialogue.length && (
        <Dialogue
          key={currentDialogueIndex}
          onClose={handleDialogueClose}
          dialogue={dialoghi.dialogue[currentDialogueIndex]}
        />
      )}

      <div
        style={{
          width: "100vw",
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "black",
        }}
      >
        <ImageMapper
          src={scenes[bgImage].src}
          name="segrete"
          imgWidth={1920}
          parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
          responsive={true}
          natural
          areas={[
            {
              id: "messSegreto",
              shape: "rect",
              coords: [1716, 1908, 2111, 2046],
              disabled: bgImage === 1,
            },
          ]}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            display: "block",
            margin: "0 auto",
            background: "black",
          }}
          onClick={(area) => {
            if (area.id === "messSegreto") {
              setBgImage(1);
              const audio = new Audio(paper);
              audio.play();
            }
          }}
        />

        {bgImage === 1 && showButtons && (
          <div
            className="absolute bottom-4 left-0 w-full flex justify-center gap-12 p-4 fade-in"
            style={{
              zIndex: 10,
            }}
          >
            <Button
              stretch={true}
              onClick={() => {
                navigate("/scena4");
              }}
              style={{
                pointerEvents: "auto",
              }}
            >
              Vai alla Stalla
            </Button>
            <Button
              stretch={true}
              onClick={() => {
                navigate("/gameOver");
                localStorage.setItem("gameover_reason", "Sei tornato dalla classe");
              }}
              style={{
                pointerEvents: "auto",
              }}
            >
              Torna dal gruppo
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Scena3;
