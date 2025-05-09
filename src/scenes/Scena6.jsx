import { useState, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import { useNavigate } from "react-router";
import Dialogue from "../components/Dialogue";

import Final from "../assets/images/backGrounds/ending/Finale3.png";
import occhiali1 from "../assets/images/backGrounds/ending/Occhiali1.png";
import occhiali2 from "../assets/images/backGrounds/ending/Occhiali2.png";
import occhiali3 from "../assets/images/backGrounds/ending/Occhiali3.png";
import occhiali4 from "../assets/images/backGrounds/ending/Occhiali4.png";
import FinalEnd from "../assets/images/backGrounds/ending/Finale3-1.png";
import suspance from "../assets/sounds/generic/suspance.mp3";
import winning from "../assets/sounds/generic/winning.mp3";
import tick from "../assets/sounds/generic/tick.mp3";

const audioSuspance = new Audio(suspance); // Istanza unica dell'audio
audioSuspance.loop = true; // Riproduci in loop
audioSuspance.volume = 0.5; // Imposta il volume iniziale

const audioWinning = new Audio(winning); // Istanza unica dell'audio
audioWinning.loop = true; // Riproduci in loop
audioWinning.volume = 0.1; // Imposta il volume iniziale

const Scena6 = () => {
  const [bgImage, setBgImage] = useState(0);
  const [fadeClass, setFadeClass] = useState("opacity-0"); // Inizia con opacità 0
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Applica il fade-in dopo un breve ritardo
    const timer = setTimeout(() => {
      setFadeClass("opacity-100"); // Cambia opacità a 100
    }, 100); // Ritardo di 100ms

    return () => clearTimeout(timer); // Pulisci il timer
  }, []);

  useEffect(() => {
    // Avvia l'audio in loop all'inizio della scena
    audioSuspance.play();

    return () => {
      // Ferma l'audio quando il componente viene smontato
      audioSuspance.pause();
      audioSuspance.currentTime = 0;
    };
  }, []);

  useEffect(() => {
    if (bgImage === 5) {
      // Ferma l'audio di suspance e avvia l'audio di winning
      audioSuspance.pause();
      audioSuspance.currentTime = 0;

      audioWinning.play(); // Avvia l'audio di winning
    }

    return () => {
      // Ferma l'audio di winning quando il componente viene smontato
      audioWinning.pause();
      audioWinning.currentTime = 0;
    };
  }, [bgImage]);

  const dialoghi = {
    dialogue: [
      {
        type: "speaking",
        speaker: "Barone",
        text: "Grazie! Hai ridato luce al mio palazzo.",
      },
      {
        type: "speaking",
        speaker: "Barone",
        text: "Gli occhiali erano un ponte tra il passato e il presente, e tu hai avuto il coraggio di attraversarlo",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "Cosa succederà adesso?",
      },
      {
        type: "speaking",
        speaker: "Barone",
        text: "Il palazzo tornerà com'era, ma il suo splendore vivrà nei tuoi ricordi",
      },
      {
        type: "speaking",
        speaker: "Barone",
        text: "E io potrò riposare in pace, sapendo che qualcuno ha custodito la sua storia",
      },
    ],
  };

  const scenes = {
    0: { id: 0, src: Final },
    1: { id: 1, src: occhiali1 },
    2: { id: 2, src: occhiali2 },
    3: { id: 3, src: occhiali3 },
    4: { id: 4, src: occhiali4 },
    5: { id: 5, src: FinalEnd },
  };

  const handleAreaClick = (area) => {
    if (area.id === "occhiali") {
      setBgImage(1);
    } else if (area.id === "crafting") {
      if (bgImage === 4) {
        // Gestisci il passaggio da bgImage[4] a bgImage[5] con dissolvenza
        setFadeClass("opacity-0"); // Applica il fade-out

        // Esegui il fade-out dell'audio
        const fadeOutInterval = setInterval(() => {
          if (audioSuspance.volume > 0.1) {
            audioSuspance.volume -= 0.1; // Riduci gradualmente il volume
          } else {
            clearInterval(fadeOutInterval); // Ferma il fade-out
            audioSuspance.pause(); // Metti in pausa l'audio
            audioSuspance.currentTime = 0; // Resetta l'audio
          }
        }, 100); // Riduci il volume ogni 100ms

        setTimeout(() => {
          setBgImage(5); // Cambia immagine a bgImage[5]
          setFadeClass("opacity-100"); // Applica il fade-in
        }, 1000); // Durata del fade-out (1 secondo)
      } else {
        const tickAudio = new Audio(tick);
        tickAudio.volume = 0.7; // Imposta il volume
        tickAudio.play(); // Riproduci il suono
        setBgImage((next) => {
          if (next < 5) {
            return next + 1;
          } else {
            navigate("/win");
            return next;
          }
        });
      }
    }
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen transition-opacity duration-1000 ${fadeClass}`}
    >
      {bgImage === 5 && (
        <Dialogue
          key={`dialogue-${currentDialogueIndex}`}
          onClose={() => {
            if (currentDialogueIndex < dialoghi.dialogue.length - 1) {
              setCurrentDialogueIndex(currentDialogueIndex + 1); // Avanza al dialogo successivo
            } else {
              setFadeClass("opacity-0"); // Applica il fade-out
              setTimeout(() => {
                const fadeOutInterval = setInterval(() => {
                  if (audioWinning.volume > 0.1) {
                    audioWinning.volume -= 0.1; // Riduci gradualmente il volume
                  } else {
                    clearInterval(fadeOutInterval); // Ferma il fade-out
                    audioWinning.pause(); // Metti in pausa l'audio
                    audioWinning.currentTime = 0; // Resetta l'audio
                  }
                }, 100); // Riduci il volume ogni 100ms

                navigate("/win"); // Naviga alla pagina di vittoria
              }, 1000); // Durata del fade-out (1 secondo)
            }
          }}
          dialogue={dialoghi.dialogue[currentDialogueIndex]}
        />
      )}

      <ImageMapper
        src={scenes[bgImage].src}
        imgWidth={1920}
        name="ending"
        parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
        responsive={true}
        natural
        onClick={(area) => handleAreaClick(area)} // Gestore per il clic sulle aree
        areas={[
          {
            id: "occhiali",
            shape: "rect",
            coords: [1328, 934, 2393, 1981],
            disabled: bgImage !== 0,
          },
          {
            id: "crafting",
            shape: "rect",
            coords: [1243, 747, 2827, 1971],
            disabled: bgImage == 0 || bgImage == 5,
          },
        ]}
      />
    </div>
  );
};

export default Scena6;
