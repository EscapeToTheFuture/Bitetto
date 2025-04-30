import React, { useState } from "react";
import Atrio1 from "../assets/images/backGrounds/Atrio-1.png";
import Atrio2 from "../assets/images/backGrounds/Atrio-2.png";
import Atrio3 from "../assets/images/backGrounds/Atrio-3.png"; // Importa Atrio-3
import Dialogue from "../components/Dialogue";
import { useNavigate } from "react-router"; // Importa useNavigate
import ImageMapper from "react-img-mapper";

const Scena1 = () => {
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [backgroundImage, setBackgroundImage] = useState(Atrio1); // Stato per gestire l'immagine di sfondo
  const navigate = useNavigate(); // Inizializza useNavigate

  const atrios = [
    { id: 1, name: "Atrio1", src: Atrio1 },
    { id: 2, name: "Atrio2", src: Atrio2 },
    { id: 3, name: "Atrio3", src: Atrio3 },
  ];

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

  const handleAreaClick = (area) => {
    if (area.name === "Atrio1") {
      setBackgroundImage(atrios[0]); // Cambia l'immagine di sfondo in Atrio-1
      setCurrentDialogueIndex(0); // Inizia i dialoghi da 0
    } else if (area.name === "Atrio2") {
      setBackgroundImage(atrios[1]); // Cambia l'immagine di sfondo in Atrio-2
      setCurrentDialogueIndex(3); // Inizia i dialoghi da 3
    } else if (area.name === "Corridoio" && backgroundImage === Atrio2) {
      setBackgroundImage(atrios[2]); // Cambia l'immagine di sfondo in Atrio-3
    }
  };

  const handleDialogueClose = () => {
    if (backgroundImage === Atrio1 && currentDialogueIndex < 2) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    } else if (backgroundImage === Atrio1 && currentDialogueIndex === 2) {
      setBackgroundImage(Atrio2);
      setCurrentDialogueIndex(3);
    } else if (backgroundImage === Atrio2 && currentDialogueIndex < 5) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    }
  };

  return (
    <div className="w-full h-svh flex flex-col items-center justify-center relative">
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

      <ImageMapper
        src={backgroundImage}
        onClick={(area) => handleAreaClick(area)}
        natural
        imgWidth={1920} // Larghezza originale dell'immagine
        parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth} // Adatta alla larghezza della finestra
        responsive={true} // Abilita il ridimensionamento automatico
        areas={[
          {
            name: "Corridoio",
            shape: "rect",
            coords: [3275, 158, 3998, 1530], // Coordinate per il corridoio
            fillColor: "rgba(237, 20, 61, 0.5)",
            strokeColor: "rgba(237, 20, 61, 0.5)",
            strokeWidth: 2,
            preFillColor: "rgba(237, 20, 61, 0.5)",
          },
        ]}
      />
    </div>
  );
};

export default Scena1;
