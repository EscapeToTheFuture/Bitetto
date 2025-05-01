import React, { useState, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import Dialogue from "../components/Dialogue";
import { useNavigate } from "react-router";
import Room1 from "../assets/images/backGrounds/Room1.png";
import Room2 from "../assets/images/backGrounds/Room2.png";
import Room3 from "../assets/images/backGrounds/Room3.png";
import Room4 from "../assets/images/backGrounds/Room4.png";
import Room5 from "../assets/images/backGrounds/Room5.png";
import RoomFinal from "../assets/images/backGrounds/RoomFinal.png";

const Scena2 = () => {
  const rooms = {
    0: { id: 0, src: Room1 },
    1: { id: 1, src: Room2 },
    2: { id: 2, src: Room3 },
    3: { id: 3, src: Room4 },
    4: { id: 4, src: Room5 },
    5: { id: 5, src: RoomFinal },
  };

  const navigate = useNavigate();

  const [bgImage, setBgImage] = useState(0);
  const [fadeClass, setFadeClass] = useState(""); // Stato per gestire la classe di dissolvenza
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);

  const handleDialogueClose = () => {
    if (currentDialogueIndex < scene.dialogue.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
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
        text: "Ogni quadro ritra il Barone in diverse fasi della vita:",
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

  console.log("Current bgImage:", bgImage);

  return (
    <div className={`flex flex-col items-center justify-center h-screen ${fadeClass}`}>
      {currentDialogueIndex < scene.dialogue.length - 1 && (
        <Dialogue
          key={currentDialogueIndex}
          onClose={handleDialogueClose}
          dialogue={scene.dialogue[currentDialogueIndex]}
        />
      )}

      {bgImage === 4 ? (
        <Dialogue
          dialogue={scene.dialogue[7]}
          onClose={() => {
            setCliccable(true);
          }}
        />
      ) : null}

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
        onClick={(area) => {
          // Verifica se l'area è disabilitata
          if (area.disable) {
            console.log(`L'area ${area.id} è disabilitata.`);
            return;
          }

          // Esegui l'azione solo se l'area è abilitata
          if (area.id === "occhiali") {
            setBgImage(1);
          } else if (area.id === "scettro") {
            setBgImage(2);
          } else if (area.id === "libri") {
            setBgImage(3);
          } else if (area.id === "palla") {
            setBgImage(4);
          } else if (area.id === "porta" && bgImage === 4) {
            // Aggiungi dissolvenza tra bgImage[4] e bgImage[5]
            setFadeClass("fade-out");
            setTimeout(() => {
              setBgImage(5); // Cambia l'immagine di sfondo a 5
              setFadeClass("fade-in");
            }, 1000); // Tempo per la dissolvenza in uscita
          } else if (area.id === "porta" && bgImage === 5) {
            // Aggiungi dissolvenza in uscita prima di navigare
            setFadeClass("fade-out");
            setTimeout(() => {
              navigate("/scena3"); // Naviga a Scena3 solo dopo la dissolvenza
            }, 1000); // Tempo per la dissolvenza in uscita
          }
        }}
      />
    </div>
  );
};

export default Scena2;
