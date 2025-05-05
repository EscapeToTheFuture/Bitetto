import React, { useState, useEffect, useRef } from "react";
import ImageMapper from "react-img-mapper";
import Dialogue from "../components/Dialogue";
import { useNavigate } from "react-router";
import Room1 from "../assets/images/backGrounds/Room1.png";
import Room2 from "../assets/images/backGrounds/Room2.png";
import Room3 from "../assets/images/backGrounds/Room3.png";
import Room4 from "../assets/images/backGrounds/Room4.png";
import Room5 from "../assets/images/backGrounds/Room5.png";
import RoomFinal from "../assets/images/backGrounds/RoomFinal.png";
import basement from "../assets/sounds/generic/basement.mp3";
import unlock from "../assets/sounds/generic/unlockwall.mp3";
import quadro from "../assets/sounds/generic/quadro.mp3";

const Scena2 = () => {
  const rooms = {
    0: { id: 0, src: Room1 },
    1: { id: 1, src: Room2 },
    2: { id: 2, src: Room3 },
    3: { id: 3, src: Room4 },
    4: { id: 4, src: Room5 },
    5: { id: 5, src: RoomFinal },
  };

  const hints = [
    "Forse devo iniziare dagli occhiali di ferro.",
    "Quella chiave sarà importante.",
    "I libri rossi sono un indizio.",
    "La palla con cui giocava da piccolo!",
    "Il quadro si è mosso!",
    "Dovrei passare attraverso questo passaggio.",
  ];

  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState(0);
  const [fadeClass, setFadeClass] = useState(""); // Stato per gestire la classe di dissolvenza
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showHint, setShowHint] = useState(false); // Stato per il suggerimento
  const basementAudioRef = useRef(new Audio(basement)); // Riferimento per il suono di sottofondo
  const unlockAudioRef = useRef(new Audio(unlock)); // Riferimento per il suono di sblocco

  // Riproduci il suono di sottofondo "basement" all'inizio della scena
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

  // Timer per mostrare il suggerimento
  useEffect(() => {
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
  }, [bgImage]);

  useEffect(() => {
    if (bgImage === 4) {
      // Imposta l'indice del dialogo sull'ultimo
      setCurrentDialogueIndex(scene.dialogue.length-1);
    }
  }, [bgImage]);

  const handleDialogueClose = () => {
    if (currentDialogueIndex < scene.dialogue.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    }
  };

  const handleAreaClick = (area) => {
    if (area.id === "occhiali" && bgImage === 0) {
      // Passa alla stanza successiva
      setBgImage(1);
      console.log("Hai cliccato sugli occhiali. Passa alla stanza successiva.");
    } else if (area.id === "scettro" && bgImage === 1) {
      // Passa alla stanza successiva
      setBgImage(2);
      console.log("Hai cliccato sullo scettro. Passa alla stanza successiva.");
    } else if (area.id === "libri" && bgImage === 2) {
      // Passa alla stanza successiva
      setBgImage(3);
      console.log("Hai cliccato sui libri. Passa alla stanza successiva.");
    } else if (area.id === "palla" && bgImage === 3) {
      // Passa alla stanza successiva
      setBgImage(4);
      console.log("Hai cliccato sulla palla. Passa alla stanza successiva.");
    } else if (area.id === "porta" && bgImage === 4) {
      // Passa alla stanza finale
      setFadeClass("fade-out");
      setTimeout(() => {
        setBgImage(5);
        setFadeClass("fade-in");
        const quadroAudio = new Audio(quadro);
        quadroAudio.volume = 0.5;
        quadroAudio
          .play()
          .then(() => {
            console.log("Suono quadro riprodotto correttamente");
          })
          .catch((error) => {
            console.error("Errore nella riproduzione di quadro:", error);
          });
      }, 1000);
    } else if (area.id === "porta" && bgImage === 5) {
      // Naviga alla scena successiva
      setFadeClass("fade-out");
      setTimeout(() => {
        navigate("/scena3");
      }, 1000);
    } else {
      console.log(
        `Area cliccata: ${area.id}, ma non è gestita per bgImage: ${bgImage}`
      );
    }
  };

  const scene = {
    dialogue: [
      {
        type: "narrator",
        text: "Luca entra in una stanza isolata, dove la luce fioca illumina quattro quadri appesi alle pareti.",
      },
      {
        type: "narrator",
        text: "Ogni quadro ritrae il Barone in diverse fasi della vita:",
      },
      {
        type: "narrator",
        text: "1. Primo Quadro: Il Barone bambino",
      },
      {
        type: "narrator",
        text: "2. Secondo Quadro: Il Barone adolescente",
      },
      {
        type: "narrator",
        text: "3. Terzo Quadro: Il Barone adulto",
      },
      {
        type: "narrator",
        text: "4. Quarto Quadro: Il Barone anziano",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "Dev’essere il Barone... ma cosa vogliono dire questi quadri!",
      },
      {
        type: "narrator",
        text: "Il quadro centrale sembra muoversi!",
      },
    ],
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${fadeClass}`}
    >
      {currentDialogueIndex < scene.dialogue.length - 1 && (
        <Dialogue
          key={currentDialogueIndex}
          onClose={handleDialogueClose}
          dialogue={scene.dialogue[currentDialogueIndex]}
        />
      )}

      {showHint && (
        <Dialogue
          dialogue={{
            speaker: "Suggerimento",
            text: hints[bgImage], // Mostra il suggerimento corrispondente al bgImage
          }}
          onClose={() => setShowHint(false)}
        />
      )}

      {bgImage == 4 && (
          <Dialogue
            key={currentDialogueIndex}
            onClose={handleDialogueClose}
            dialogue={scene.dialogue[currentDialogueIndex]}
          />
        )}

      <ImageMapper
        src={rooms[bgImage].src}
        name="room"
        imgWidth={1920}
        parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
        responsive={true}
        natural
        areas={[
          {
            id: "libri",
            shape: "poly",
            coords: [
              360, 894, 438, 919, 452, 961, 402, 997, 314, 969, 311, 930,
            ],
            disabled: bgImage !== 2,
          },
          {
            id: "palla",
            shape: "circle",
            coords: [253, 1865, 27],
            disabled: bgImage !== 3,
          },
          {
            id: "occhiali",
            shape: "rect",
            coords: [3485, 964, 3636, 1031],
            disabled: bgImage !== 0,
          },
          {
            id: "scettro",
            shape: "poly",
            coords: [
              2309, 667, 2355, 723, 2348, 769, 2288, 808, 2182, 1123, 2157,
              1119, 2252, 812, 2231, 783, 2221, 738, 2224, 695, 2267, 677,
            ],
            disabled: bgImage !== 1,
          },
          {
            id: "porta",
            shape: "rect",
            coords: [1360, 11, 2579, 1610],
            disabled: bgImage !== 4 && bgImage !== 5,
          },
        ]}
        style={{
          width: "100vw", // Adatta l'immagine alla larghezza del viewport
          height: "100vh", // Adatta l'immagine all'altezza del viewport
          objectFit: "contain", // Mantiene le proporzioni e assicura che l'immagine non venga tagliata
        }}
        onClick={(area) => handleAreaClick(area)}
      />
    </div>
  );
};

export default Scena2;
