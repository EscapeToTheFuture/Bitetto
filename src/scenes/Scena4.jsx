import { useState, useEffect, useRef } from "react";
import ImageMapper from "react-img-mapper";
import Dialogue from "../components/Dialogue";
import { useNavigate } from "react-router";
import Button from "../components/Button";
import Stalla from "../assets/images/backGrounds/stalla/Stalla.png";
import bottiglia from "../assets/images/backGrounds/stalla/StallaBottiglia.png";
import stivali from "../assets/images/backGrounds/stalla/StallaStivali.png";
import exit from "../assets/images/backGrounds/stalla/StallaUscita.png";
import correct from "../assets/sounds/generic/correct.mp3";
import fienile from "../assets/sounds/generic/fienile.m4a";
import run from "../assets/sounds/generic/running.mp3";

const Scena4 = () => {
  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState(0);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showHint, setShowHint] = useState(false); // Stato per il suggerimento
  const [fadeClass, setFadeClass] = useState(""); // Stato per gestire la classe di dissolvenza
  const [dialogoFinito, setDialogoFinito] = useState(false); // Stato per il dialogo finito
  const [currentInteractionIndex, setCurrentInteractionIndex] = useState(null); // Stato per il dialogo corrente
  const [disabledAreas, setDisabledAreas] = useState([]); // Stato per le aree disabilitate
  const fienileRef = useRef(new Audio(fienile)); // Riferimento per il suono di sottofondo
  const [exiting, setExiting] = useState(false); // Stato per gestire l'uscita
  const [gameOver, setGameOver] = useState(0); // Stato per gestire il game over
  const [fadeButtons, setFadeButtons] = useState(false); // Stato per il fade-out dei pulsanti

  useEffect(() => {
    const audio = fienileRef.current;
    audio.volume = 0.5; // Imposta il volume iniziale
    audio.loop = true; // Riproduzione in loop
    audio
      .play()
      .then(() => {
        console.log("Fienile audio avviato correttamente");
      })
      .catch((error) => {
        console.error("Errore nella riproduzione di fienile:", error);
      });

    return () => {
      audio.pause(); // Pausa il suono quando il componente viene smontato
      audio.currentTime = 0; // Resetta il suono
    };
  }, []);

  const scenes = {
    0: { id: 0, src: Stalla },
    1: { id: 1, src: bottiglia },
    2: { id: 2, src: stivali },
    3: { id: 3, src: exit },
  };

  const dialoghi = {
    dialogue: [
      {
        type: "narrator",
        text: "Luca si trova in una stalla buia e polverosa, circondato da attrezzi agricoli e fieno.",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "Devo assolutamente trovare gli altri pezzi!",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "Ora devo trovare gli altri pezzi!",
      },
      {
        type: "speaking",
        speaker: "Guida",
        text: "Come mai non sei con il tuo gruppo!",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "Mi scusi, mi ero perso",
      },
      {
        type: "speaking",
        speaker: "Guida",
        text: "Ehi, non andare da quella parte! Questo è un posto pericoloso!",
      },
    ],
  };

  const interazioni = {
    dialogue: [
      {
        type: "speaking",
        speaker: "Luca",
        text: "È senza etichetta. Chissà se il barone amava bibite particolari, o era fan dell’acqua di rubinetto.",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "È stranamente pesante per la sua dimensione e la superficie riflette in maniera curiosa. Guardandoci attraverso, noti che distorce le immagini in modo particolare.",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "È pesante e tutta scheggiata. Non sembra nascondere nulla",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "Non viene aperto da secoli. È pieno di ragnatele. Non c'è nulla all'interno.",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "Bleah! A parte la puzza, non c’è nulla.",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "Non c’è nemmeno un ago!",
      },
    ],
  };

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${fadeClass}`}
      onClick={() => {
        if (bgImage !== 0 && bgImage !== 3) {
          setBgImage(0); // Torna a bgImage = 0 se bgImage è diverso da 0 e 3
        }
      }}
    >
      {currentDialogueIndex < 1 && dialoghi.dialogue[currentDialogueIndex] && (
        <Dialogue
          key={`dialogue-${currentDialogueIndex}`} // Chiave univoca per il dialogo principale
          onClose={() => {
            if (currentDialogueIndex < 1) {
              setCurrentDialogueIndex(currentDialogueIndex + 1);
            }
          }}
          dialogue={dialoghi.dialogue[currentDialogueIndex]}
        />
      )}

      {exiting === true &&
        currentDialogueIndex >= 2 &&
        currentDialogueIndex <= 3 && (
          <Dialogue
            key={`dialogue-${currentDialogueIndex}`} // Chiave univoca per il dialogo principale
            onClose={() => {
              if (currentDialogueIndex < 3) {
                setCurrentDialogueIndex(currentDialogueIndex + 1); // Avanza al dialogo successivo
              } else {
                setExiting(false); // Termina lo stato di uscita
              }
              setTimeout(() => {
                setDialogoFinito(true); // Imposta dialogoFinito su true
              }, 3000); // Attendi 1 secondo prima di impostare dialogoFinito su true
            }}
            dialogue={dialoghi.dialogue[currentDialogueIndex]}
          />
        )}

      {gameOver === 1 && (
        <Dialogue
          key={`dialogue-${currentDialogueIndex}`} // Chiave univoca per il dialogo principale
          onClose={() => {
            navigate("/gameover"); // Naviga alla pagina di game over
          }}
          dialogue={dialoghi.dialogue[currentDialogueIndex]}
        />
      )}

      {gameOver === 2 && (
        <Dialogue
          key={`dialogue-${currentDialogueIndex}`} // Chiave univoca per il dialogo principale
          onClose={() => {
            setFadeClass("fade-out"); // Aggiungi la classe di fade-in
            setTimeout(() => {
              navigate("/scena5"); // Naviga alla pagina di game over
            }, 1000); // Attendi 1 secondo per completare il fade-out
          }}
          dialogue={dialoghi.dialogue[currentDialogueIndex]}
        />
      )}

      {currentInteractionIndex !== null &&
        interazioni.dialogue[currentInteractionIndex] && (
          <Dialogue
            key={`interaction-${currentInteractionIndex}`} // Chiave univoca per il dialogo di interazione
            onClose={() => setCurrentInteractionIndex(null)} // Chiudi il dialogo
            dialogue={interazioni.dialogue[currentInteractionIndex]}
          />
        )}

      {dialogoFinito && (
        <div
          className={`absolute bottom-10 flex justify-center w-full space-x-4 transition-opacity duration-1000 ${
            fadeButtons ? "opacity-0" : "opacity-100"
          }`}
        >
          <Button
            stretch={true}
            onClick={() => {
              console.log("Pulsante 1 cliccato");
              setFadeButtons(true); // Attiva il fade-out
              setTimeout(() => {
                setCurrentDialogueIndex(4);
                setGameOver(1); // Imposta gameOver su true
              }, 500); // Attendi 1 secondo per completare il fade-out
            }}
          >
            Torna dal gruppo
          </Button>
          <Button
            stretch={true}
            onClick={() => {
              setCurrentDialogueIndex(5);
              console.log("Pulsante 2 cliccato");
              setFadeButtons(true); // Attiva il fade-out
              setFadeButtons(true);
              setTimeout(() => {
                setGameOver(2); // Imposta gameOver su true
              }, 500); // Attendi 1 secondo per completare il fade-out
            }}
          >
            Fuggi
          </Button>
        </div>
      )}

      <div
        className="relative"
        style={{
          width: window.innerWidth > 1920 ? "1920px" : "100%",
          height: "auto",
        }}
        onClick={(e) => e.stopPropagation()} // Impedisce che il clic sull'immagine propaghi l'evento
      >
        <ImageMapper
          src={scenes[bgImage].src}
          imgWidth={1920}
          name="stalla"
          parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
          responsive={true}
          natural
          areas={[
            {
              id: "bottiglia",
              shape: "circle",
              coords: [3329, 1196, 189],
              disabled: bgImage !== 0 || disabledAreas.includes("bottiglia"), // Disabilita se già cliccata
              value: "0",
            },
            {
              id: "stivali",
              shape: "poly",
              coords: [
                1320, 1840, 1349, 1819, 1409, 1826, 1416, 1960, 1423, 1999,
                1395, 2010, 1352, 2003, 1306, 2017, 1250, 1992, 1320, 1957,
              ],
              disabled: bgImage !== 0 || disabledAreas.includes("stivali"), // Disabilita se già cliccata
              value: "1",
            },
            {
              id: "mattoni",
              shape: "circle",
              coords: [2704, 1854, 155],
              disabled: bgImage !== 0 || disabledAreas.includes("mattoni"), // Disabilita se già cliccata
              value: "2",
            },
            {
              id: "armadio",
              shape: "rect",
              coords: [1243, 676, 1991, 1803],
              disabled: bgImage !== 0 || disabledAreas.includes("armadio"), // Disabilita se già cliccata
              value: "3",
            },
            {
              id: "mangiatoia",
              shape: "poly",
              coords: [14, 1481, 99, 1792, 756, 1707, 847, 1439, 713, 1368],
              disabled: bgImage !== 0 || disabledAreas.includes("mangiatoia"), // Disabilita se già cliccata
              value: "4",
            },
            {
              id: "fieno",
              shape: "rect",
              coords: [3255, 1877, 3993, 2241],
              disabled: bgImage !== 0 || disabledAreas.includes("fieno"), // Disabilita se già cliccata
              value: "5",
            },
            {
              id: "exit",
              shape: "rect",
              coords: [354, 734, 1, 1418],
              disabled: bgImage !== 0 || !disabledAreas.includes("stivali"),
              value: "6",
            },
          ]}
          onClick={(area) => {
            if (area.id === "bottiglia") {
              setBgImage(1); // Imposta bgImage a 1 quando clicchi sull'area "bottiglia"
              localStorage.setItem("colla", "true"); // Memorizza colla=true in localStorage
              const audio = new Audio(correct);
              audio.volume = 0.5; // Imposta il volume dell'audio
              audio.play();
            } else if (area.id === "stivali") {
              setBgImage(2); // Imposta bgImage a 2 quando clicchi sull'area "stivali"
              const audio = new Audio(correct);
              audio.volume = 0.5; // Imposta il volume dell'audio
              audio.play();
            } else if (area.id === "exit") {
              setFadeClass("fade-out"); // Aggiungi la classe di dissolvenza
              setExiting(true); // Imposta lo stato di uscita
              setTimeout(() => {
                setBgImage(3); // Imposta bgImage a 3 quando clicchi sull'area "exit"
                setFadeClass("fade-in"); // Aggiungi la classe di fade-in
                setCurrentDialogueIndex(2); // Imposta il dialogo iniziale all'indice 2
              }, 1000); // Attendi 1 secondo per completare il fade-out
            }
            if (area.value !== undefined && area.id !== "exit") {
              setCurrentInteractionIndex(parseInt(area.value)); // Imposta il dialogo corrispondente per le altre aree
              setDisabledAreas((prev) => [...prev, area.id]); // Aggiungi l'area cliccata a quelle disabilitate
            }
          }}
        />
      </div>
    </div>
  );
};

export default Scena4;
