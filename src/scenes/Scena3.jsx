import React, { useState, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import Dialogue from "../components/Dialogue";
import { useNavigate } from "react-router";
import Segrete from "../assets/images/backGrounds/Segrete.png";
import messSegreto from "../assets/images/backGrounds/MessaggioSegreto.png";
import Button from "../components/Button";

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
  const navigate = useNavigate();

  const handleDialogueClose = () => {
    if (currentDialogueIndex < scene.dialogue.length - 1) {
      setCurrentDialogueIndex(currentDialogueIndex + 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {currentDialogueIndex < dialoghi.dialogue.length && (
        <Dialogue
          key={currentDialogueIndex}
          onClose={handleDialogueClose}
          dialogue={dialoghi.dialogue[currentDialogueIndex]}
        />
      )}

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
            disabled: bgImage === 1, // Disabilita l'area se bgImage è 1
          },
        ]}
        onClick={(area) => {
          if (area.id === "messSegreto") {
            setBgImage(1); // Imposta bgImage a 1 quando clicchi sull'area "messSegreto"
          }
        }}
      />
      {bgImage === 1 && (
        <div className="mb-15 flex items-center justify-center">
          <Button
            onClick={() => {
              navigate("/scena4"); // Naviga alla scena 4
            }}
          >
            Vai alla Stalla
          </Button>
          <Button
            onClick={() => {
              navigate("/gameOver"); // Naviga alla scena 4
            }}
          >
            Torna indietro
          </Button>
        </div>
      )}
    </div>
  );
};

export default Scena3;
