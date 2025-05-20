import React, { useState, useEffect, useRef } from "react";
import Atrio1 from "../assets/images/backGrounds/atrio/Atrio-1.png";
import Atrio2 from "../assets/images/backGrounds/atrio/Atrio-2.png";
import Atrio3 from "../assets/images/backGrounds/atrio/Atrio-3.png";
import Corridoio from "../assets/images/backGrounds/atrio/Corridoio.png";
import ImageMapper from "react-img-mapper";
import Dialogue from "../components/Dialogue";
import { useNavigate } from "react-router";
import footsteps from "../assets/sounds/generic/footsteps.mp3";
import museoambient from "../assets/sounds/generic/museoambient.mp3";

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

const Scena1 = () => {
  const scene = {
    dialogue: [
      {
        type: "narrator",
        text: "All’interno, un gruppo di studenti chiacchiera sotto la guida dell’insegnante, che li accompagna tra le sale del palazzo.",
      },
      {
        type: "speaking",
        speaker: "Insegnante",
        text: "Questa è un’opportunità speciale per immergerci nella storia!",
      },
      {
        type: "speaking",
        speaker: "Insegnante",
        text: "All’interno troverete dipinti secolari, antichi cimeli e scoprirete il passato di questo magnifico palazzo!",
      },
      {
        type: "narrator",
        text: "Luca nota un piccolo corridoio buio sulla destra, con un cartello sbiadito che riporta le parole “VIETATO L’INGRESSO”.",
      },
      {
        type: "narrator",
        text: "Il corridoio è poco illuminato e si perde nelle ombre, come se custodisse un segreto.",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "Perché mai sarà vietato?",
      },
    ],
  };

  const atrios = [
    { id: 0, src: Atrio1 },
    { id: 1, src: Atrio2 },
    { id: 2, src: Atrio3 },
    { id: 3, src: Corridoio },
  ];

  const [bgImage, setBgImage] = useState(0);
  const [fadeClass, setFadeClass] = useState("");
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showHint, setShowHint] = useState(false); // Stato per il suggerimento
  const ambientAudio = useRef(null);
  const [dialogoFinito, setDialogoFinito] = useState(false); // Stato per il dialogo finito
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const passi = useRef(null);

  useEffect(() => {
    if (!loading && !ambientAudio.current) {
      ambientAudio.current = new Audio(museoambient);
      ambientAudio.current.volume = 0.2;
      ambientAudio.current.loop = true;
      ambientAudio.current.play();
    }
    return () => {
      if (ambientAudio.current) {
        ambientAudio.current.pause();
        ambientAudio.current.currentTime = 0;
      }
    };
  }, [loading]);

  // Imposta dialogoFinito su true solo se currentDialogueIndex è alla fine
  useEffect(() => {
    if (currentDialogueIndex === scene.dialogue.length - 1) {
      setDialogoFinito(true); // Imposta il dialogo come finito
    }
  }, [currentDialogueIndex]);

  // Timer per mostrare il suggerimento (solo se dialogoFinito è true)
  useEffect(() => {
    if (!dialogoFinito) return; // Avvia il timer solo se dialogoFinito è true

    const resetTimer = () => {
      setShowHint(false);
      clearTimeout(timer);
      timer = setTimeout(() => {
        setShowHint(true); // Mostra il suggerimento dopo 7 secondi di inattività
      }, 7000);
    };

    let timer = setTimeout(() => {
      setShowHint(true);
    }, 7000);

    window.addEventListener("click", resetTimer);
    window.addEventListener("touchstart", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("click", resetTimer);
      window.removeEventListener("touchstart", resetTimer);
    };
  }, [dialogoFinito]); // Dipende da dialogoFinito

  const fadeOutAudio = (audio, onComplete) => {
    let volume = audio.volume;
    const fadeInterval = setInterval(() => {
      if (volume > 0) {
        volume -= 0.05;
        audio.volume = Math.max(volume, 0);
      } else {
        clearInterval(fadeInterval);
        audio.pause();
        if (onComplete) onComplete();
      }
    }, 100);
  };

  const handleDialogueClose = () => {
    if (currentDialogueIndex < scene.dialogue.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);

      if (currentDialogueIndex + 1 === 3) {
        setBgImage(1);
      }
    }
  };

  const handleAreaClick = (area) => {
    if (area.id === "corridoio" && currentDialogueIndex === scene.dialogue.length - 1) {
      setShowHint(false);

      fadeOutAudio(ambientAudio.current, () => {
        ambientAudio.current.volume = 0.5;
      });

      setFadeClass("");
      setBgImage(2);
      setFadeClass("");
      setTimeout(() => {
        setFadeClass("fade-out");
        setTimeout(() => {
          setBgImage(3);
          setFadeClass("fade-in");

          ambientAudio.current.pause();
          ambientAudio.current.currentTime = 0;

          const playFootsteps = () => {
            if (!passi.current) {
              passi.current = new Audio(footsteps);
              passi.current.volume = 0.5;
            }
            passi.current.play();
          };

          playFootsteps();

          setTimeout(() => {
            setFadeClass("fade-out");
            setTimeout(() => {
              passi.current.pause();
              passi.current.currentTime = 0;
              navigate("/scena2");
            }, 2000);
          }, 2000);
        }, 1000);
      }, 1000);
    }
  };

  // Preload solo immagini per il loader
  useEffect(() => {
    Promise.all(
      atrios.map((a) => preloadImage(a.src))
    ).then(() => setLoading(false));
  }, []);

  // Mostra un loader finché non è tutto pronto
  if (loading) {
    return (
      <section className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h1>Caricamento...</h1>
      </section>
    );
  }

  return (
    <section className={`flex flex-col items-center justify-center h-screen ${fadeClass}`}>
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
          imgWidth={1920}
          parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
          responsive={true}
          natural
          src={atrios[bgImage].src}
          name="atrio"
          onClick={(area, _, event) => {
            handleAreaClick(area);
          }}
          areas={[
            {
              id: "corridoio",
              shape: "rect",
              coords: [3275, 158, 3998, 1530],
              disabled: currentDialogueIndex < scene.dialogue.length - 1,
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
        />
      </div>

      {showHint && (
        <Dialogue
          dialogue={{
            speaker: "Suggerimento",
            text: "Prova a cliccare sul corridoio buio per scoprire cosa nasconde.",
          }}
          onClose={() => setShowHint(false)}
        />
      )}

      {scene.dialogue.map(
        (dialogue, index) =>
          index === currentDialogueIndex && (
            <Dialogue
              key={currentDialogueIndex}
              dialogue={dialogue}
              onClose={handleDialogueClose}
            />
          )
      )}
    </section>
  );
};

export default Scena1;
