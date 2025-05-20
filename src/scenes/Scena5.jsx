import { useState, useEffect, useRef } from "react";
import ImageMapper from "react-img-mapper";
import Dialogue from "../components/Dialogue";
import { useNavigate } from "react-router";
import Button from "../components/Button";

import TorreEst from "../assets/images/backGrounds/torre/TorreEsterno.png";
import TorreInt from "../assets/images/backGrounds/torre/TorreInterno.png";
import Finale1 from "../assets/images/backGrounds/ending/Finale1.png";
import Finale2 from "../assets/images/backGrounds/ending/Finale2.png";
import Finale2pt2 from "../assets/images/backGrounds/ending/Finale2-1.png";

import run from "../assets/sounds/generic/running.mp3";
import police from "../assets/sounds/generic/police.mp3";
import crash from "../assets/sounds/generic/crash.mp3";
import groove from "../assets/sounds/generic/groove.mp3";

const audioRun = new Audio(run); // Istanza unica dell'audio
audioRun.volume = 0.5; // Imposta il volume

const Scena5 = () => {
  const [bgImage, setBgImage] = useState(0);
  const [fadeClass, setFadeClass] = useState(""); // Inizia senza classe
  const [showContent, setShowContent] = useState(false); // Stato per il rendering iniziale
  const [start, setStart] = useState("opacity-0"); // Stato per il suono di inizio
  const [aresettata, setAresettata] = useState(false); // Stato per il reset dell'area
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0); // Indice del dialogo corrente
  const [dialogoFinito, setDialogoFinito] = useState(false); // Stato per il dialogo finito
  const [fadeButtons, setFadeButtons] = useState(""); // Stato per il fade-out dei pulsanti
  const [loading, setLoading] = useState(true); // Stato di caricamento
  const navigate = useNavigate();

  const audioGroove = new Audio(groove);
  audioGroove.volume = 0.1;
  audioGroove.loop = true;

  useEffect(() => {
    // Ritarda il rendering iniziale per applicare correttamente il fade-in
    audioRun.play(); // Avvia la riproduzione

    const initialTimer = setTimeout(() => {
      setStart("opacity-100"); // Rimuovi l'opacità iniziale
      setFadeClass("fade-in"); // Applica il fade-in
      setShowContent(true); // Mostra il contenuto
      setLoading(false); // Imposta il caricamento su false
    }, 500); // Ritardo di 100ms

    // Sequenza di animazioni
    const timer1 = setTimeout(() => {
      setStart("opacity-0"); // Rimuovi l'opacità iniziale
      setFadeClass("fade-out"); // Avvia il fade-out
    }, 2000); // Durata del fade-in (2 secondi)

    const timer2 = setTimeout(() => {
      setBgImage(1); // Cambia immagine
      setStart("opacity-100"); // Rimuovi l'opacità iniziale
      setFadeClass("fade-in"); // Avvia il fade-in per la nuova immagine
      setAresettata(true); // Resetta l'area
      audioGroove.volume = 0.1; // Imposta il volume
      audioGroove.loop = true; // Imposta il loop
      audioGroove.play(); // Avvia la riproduzione
    }, 3000); // Durata totale (fade-in + fade-out)

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const audioGrooveRef = useRef(null);

  useEffect(() => {

    return () => {
      // Stop e reset audio al cambio scena
      if (audioGrooveRef.current) {
        audioGrooveRef.current.pause();
        audioGrooveRef.current.currentTime = 0;
      }
    };
  }, []);
  const scenes = {
    0: { id: 0, src: TorreEst },
    1: { id: 1, src: TorreInt },
    2: { id: 2, src: Finale1 },
    3: { id: 3, src: Finale2 },
    4: { id: 4, src: Finale2pt2 },
  };

  const [clickedOcchiali, setClickedOcchiali] = useState(false); // Stato per tracciare il clic su occhiali

  const handleAreaClick = (area) => {
    if (area.id === "occhiali") {
      setClickedOcchiali(true); // Imposta a true quando l'area occhiali viene cliccata
    }
  };

  const dialoghi = {
    dialogue: [
      {
        type: "narrator",
        text: "Luca si ritrova in una vecchia torre.",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "Qui ci sono i restanti pezzi dell'occhiale!",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "Cosa faccio ora?",
      },
      {
        type: "speaking",
        speaker: "Guida",
        text: "Finalmente ti ho trovato. Avanti, torniamo dai tuoi, prima che mi venga un infarto.",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "Ehi, aspetta! Devo dirti cosa ho scoperto! C'è un mistero enorme qui!",
      },
      {
        type: "speaking",
        speaker: "Guida",
        text: "Mi spiace, niente scuse, dobbiamo tornare dagli altri. Rischio di finire nei guai anch’io.",
      },
      {
        type: "speaking",
        speaker: "Luca",
        text: "Fantastico… Proprio quando pensavo di avercela fatta.",
      },
      {
        type: "narrator",
        text: "Si alza, scrollandosi di dosso la polvere, e con un sospiro si dirige verso la sua classe.",
      },
      {
        type: "narrator",
        text: "Luca guarda il palazzo un'ultima volta, chiedendosi cosa avrebbe potuto scoprire se gli occhiali non si fossero rotti.",
      },
    ],
  };

  const stopGrooveAudio = () => {
    const fadeOutInterval = setInterval(() => {
      if (audioGroove.volume > 0.1) {
        audioGroove.volume -= 0.1; // Riduci gradualmente il volume
      } else {
        clearInterval(fadeOutInterval); // Ferma il fade-out
        audioGroove.pause(); // Metti in pausa l'audio
        audioGroove.currentTime = 0; // Resetta l'audio
      }
    }, 100); // Riduci il volume ogni 100ms
  };

  useEffect(() => {
    Promise.all([
      preloadImage(TorreEst),
      preloadImage(TorreInt),
      preloadImage(Finale1),
      preloadImage(Finale2),
      preloadImage(Finale2pt2),
    ]).then(() => setLoading(false));
    // Gli audio vengono istanziati solo quando servono
  }, []);

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

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <h1>Caricamento...</h1>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col items-center justify-center h-screen ${start} ${fadeClass}`}
    >
      {currentDialogueIndex < 3 && aresettata && (
        <Dialogue
          key={`dialogue-${currentDialogueIndex}`}
          onClose={() => {
            if (currentDialogueIndex < 2) {
              setCurrentDialogueIndex(currentDialogueIndex + 1); // Avanza al dialogo successivo
            }
            if (currentDialogueIndex === 2) {
              setDialogoFinito(true); // Mostra i pulsanti alla fine del dialogo
              setFadeButtons("opacity-100"); // Rimuovi il fade-out
            }
          }}
          dialogue={dialoghi.dialogue[currentDialogueIndex]}
        />
      )}

      {currentDialogueIndex >= 3 && currentDialogueIndex <= 5 && (
        <Dialogue
          key={`dialogue-${currentDialogueIndex}`}
          onClose={() => {
            if (currentDialogueIndex < 5) {
              setCurrentDialogueIndex(currentDialogueIndex + 1); // Avanza al dialogo successivo
            }
            if (currentDialogueIndex === 5) {
              audioGroove.pause(); // Ferma l'audio
              audioGroove.currentTime = 0; // Resetta l'audio

              setTimeout(() => {
                navigate("/gameover"); // Naviga alla scena finale
                localStorage.setItem("gameover_reason", "Sei stato beccato!"); // <-- aggiungi questa riga
              }, 2000); // Attendi 2 secondi prima di navigare
            }
          }}
          dialogue={dialoghi.dialogue[currentDialogueIndex]}
        />
      )}

      {currentDialogueIndex >= 6 && currentDialogueIndex <= 8 && (
        <Dialogue
          key={`dialogue-${currentDialogueIndex}`}
          onClose={() => {
            if (currentDialogueIndex < 7) {
              setCurrentDialogueIndex(currentDialogueIndex + 1); // Avanza al dialogo successivo
            }
            if (currentDialogueIndex === 7) {
              setFadeClass("fade-out"); // Aggiungi la classe di fade-out
              setStart("opacity-0"); // Rimuovi l'opacità iniziale
              setTimeout(() => {
                setBgImage(4); // Imposta bgImage su 2
                setFadeClass("fade-in"); // Aggiungi la classe di fade-in
                setStart("opacity-100"); // Rimuovi l'opacità iniziale
                setCurrentDialogueIndex(8); // Resetta l'indice del dialogo
              }, 2000); // Attendi 2 secondi prima di navigare
            } else if (currentDialogueIndex === 8) {
              audioGroove.pause(); // Ferma l'audio
              audioGroove.currentTime = 0; // Resetta l'audio
              setTimeout(() => {
                navigate("/gameover"); // Naviga alla scena
                localStorage.setItem(
                  "gameover_reason",
                  "Non hai risolto il mistero!"
                ); // <-- aggiungi questa riga
              }, 2000); // Attendi 2 secondi prima di navigare
            }
          }}
          dialogue={dialoghi.dialogue[currentDialogueIndex]}
        />
      )}

      {dialogoFinito && (
        <div
          className={`absolute bottom-10 flex justify-evenly w-full space-x-4 transition-opacity duration-1000 ${fadeButtons}`}
        >
          <Button
            stretch={true}
            onClick={() => {
              console.log("Pulsante 1 cliccato");
              stopGrooveAudio(); // Ferma l'audio con dissolvenza
              audioGroove.pause(); // Ferma l'audio
              audioGroove.currentTime = 0; // Resetta l'audio

              setFadeButtons(true); // Attiva il fade-out
              setFadeClass("fade-out"); // Aggiungi la classe di fade-out
              setStart("opacity-0"); // Rimuovi l'opacità iniziale
              setTimeout(() => {
                const audioPolice = new Audio(police); // Istanza unica dell'audio
                audioPolice.volume = 0.5; // Imposta il volume
                audioPolice.play(); // Avvia la riproduzione
              }, 1000); // Attendi 1 secondo per completare il fade-out
              setTimeout(() => {
                setBgImage(2); // Imposta bgImage su 2
                setFadeClass("fade-in"); // Aggiungi la classe di fade-in
                setStart("opacity-100"); // Rimuovi l'opacità iniziale
                setFadeButtons("opacity-0"); // Aggiungi la classe di fade-out
                setCurrentDialogueIndex(3); // Resetta l'indice del dialogo
              }, 2000); // Attendi 2 secondi per completare il fade-out
            }}
          >
            Nascondi gli occhiali <br /> nel baule
          </Button>
          <Button
            stretch={true}
            onClick={() => {
              console.log("Pulsante 2 cliccato");
              stopGrooveAudio(); // Ferma l'audio con dissolvenza
              audioGroove.pause(); // Ferma l'audio
              audioGroove.currentTime = 0; // Resetta l'audio

              setFadeButtons(true); // Attiva il fade-out
              setFadeClass("fade-out"); // Aggiungi la classe di fade-out
              setStart("opacity-0"); // Rimuovi l'opacità iniziale
              setTimeout(() => {
                const audioCrash = new Audio(crash); // Istanza unica dell'audio
                audioCrash.volume = 0.5; // Imposta il volume
                audioCrash.play(); // Avvia la riproduzione
              }, 500); // Attendi 1 secondo per completare il fade-out
              setTimeout(() => {
                setBgImage(3); // Imposta bgImage su 3
                setFadeClass("fade-in"); // Aggiungi la classe di fade-in
                setStart("opacity-100"); // Rimuovi l'opacità iniziale
                setFadeButtons("opacity-0"); // Aggiungi la classe di fade-out
                setCurrentDialogueIndex(6); // Resetta l'indice del dialogo
              }, 2000); // Attendi 2 secondi per completare il fade-out
            }}
          >
            Fuggi con gli occhiali
          </Button>
          {localStorage.getItem("colla") === "true" && (
            <Button
              stretch={true}
              onClick={() => {
                console.log("Pulsante 3 cliccato");
                stopGrooveAudio(); // Ferma l'audio con dissolvenza
                audioGroove.pause(); // Ferma l'audio
                audioGroove.currentTime = 0; // Resetta l'audio

                setFadeButtons(true); // Attiva il fade-out
                setFadeClass("fade-out"); // Aggiungi la classe di fade-out
                setStart("opacity-0"); // Rimuovi l'opacità iniziale
                setTimeout(() => {
                  navigate("/scena6"); // Naviga alla scena finale
                }, 2000); // Attendi 1 secondo per completare il fade-out
              }}
            >
              Usa la colla e ricomponi <br /> gli occhiali
            </Button>
          )}
        </div>
      )}

      {showContent && (
        <ImageMapper
          src={scenes[bgImage].src}
          imgWidth={1920}
          name="torre"
          parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
          responsive={true}
          natural
          areas={[
            {
              id: "occhiali",
              shape: "poly",
              coords: [
                3359, 1678, 3187, 1854, 3187, 2027, 3222, 2017, 3441, 1844,
                3479, 1833, 3430, 1763, 3388, 1696,
              ],
              disabled: true,
            },
            {
              id: "baule",
              shape: "rect",
              coords: [2488, 927, 3282, 1611],
              disabled: true,
            },
          ]}
          onClick={(area) => handleAreaClick(area)} // Gestore per il clic sulle aree
        />
      )}
    </div>
  );
};

export default Scena5;
