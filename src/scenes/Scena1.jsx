import React from "react";
import Atrio1 from "../assets/images/backGrounds/Atrio-1.png";
import Atrio2 from "../assets/images/backGrounds/Atrio-2.png";
import Atrio3 from "../assets/images/backGrounds/Atrio-3.png";
import Corridoio from "../assets/images/backGrounds/Corridoio.png"; // Importa Atrio-4
import ImageMapper from "react-img-mapper";
import Dialogue from "../components/Dialogue";
import { useNavigate } from "react-router";
import { useState } from "react";

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
    { id: 3, src: Corridoio }, // Aggiungi l'immagine del corridoio
  ];

  const [bgImage, setBgImage] = useState(0);
  const [fadeClass, setFadeClass] = useState(""); // Stato per gestire la classe di dissolvenza

  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const navigate = useNavigate();
  
  const handleDialogueClose = () => {
    if (currentDialogueIndex < scene.dialogue.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
  
      // Cambia lo sfondo quando i primi tre dialoghi sono completati
      if (currentDialogueIndex + 1 === 3) {
        setBgImage(1);
      }
    }
  };

  const handleAreaClick = (area) => {
    if (area.id === "corridoio" && currentDialogueIndex === scene.dialogue.length - 1) {
      setFadeClass(""); // Inizia la dissolvenza in uscita
        setBgImage(2); // Imposta bgImage[2] senza dissolvenza
        setFadeClass(""); // Rimuove la classe di dissolvenza per il passaggio immediato
        setTimeout(() => {
          setFadeClass("fade-out"); // Inizia una nuova dissolvenza in uscita
          setTimeout(() => {
            setBgImage(3); // Imposta bgImage[3]
            setFadeClass("fade-in"); // Dissolvenza in entrata per bgImage[3]
            setTimeout(() => {
              setFadeClass("fade-out"); // Dissolvenza in uscita finale
              setTimeout(() => {
                navigate("/scena2"); // Naviga a Scena2
              }, 2000); // Tempo per la dissolvenza in uscita
            }, 2000); // Tempo per la dissolvenza in entrata
          }, 1000); // Tempo per la dissolvenza in uscita
        }, 1000); // Tempo per visualizzare bgImage[3]
    }
  };

  return (
    <section className={`flex flex-col items-center justify-center h-screen ${fadeClass}`}>
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
            coords: [3275, 158, 3998, 1530], // Coordinate per il corridoio
            disabled: currentDialogueIndex < scene.dialogue.length - 1, // Disabilita l'area fino al completamento dei dialoghi
          },
        ]}
        style={{
          width: "100%", // Adatta l'immagine alla larghezza del contenitore
          height: "auto", // Mantieni le proporzioni dell'immagine
          objectFit: "contain", // Assicura che l'immagine non venga tagliata
        }}
      />
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
