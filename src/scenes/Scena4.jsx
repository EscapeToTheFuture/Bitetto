import React from "react";
import { useState, useEffect } from "react";
import ImageMapper from "react-img-mapper";
import Dialogue from "../components/Dialogue";
import { useNavigate } from "react-router";
import Stalla from "../assets/images/backGrounds/stalla/Stalla.png";
import bottiglia from "../assets/images/backGrounds/stalla/StallaBottiglia.png";
import stivali from "../assets/images/backGrounds/stalla/StallaStivali.png";
import exit from "../assets/images/backGrounds/stalla/StallaUscita.png";

const Scena4 = () => {
  const navigate = useNavigate();
  const [bgImage, setBgImage] = useState(0);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [showHint, setShowHint] = useState(false); // Stato per il suggerimento
  const [fadeClass, setFadeClass] = useState(""); // Stato per gestire la classe di dissolvenza

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
    ],
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {currentDialogueIndex < dialoghi.dialogue.length && (
        <Dialogue
          key={currentDialogueIndex}
          onClose={() => {
            if (currentDialogueIndex < dialoghi.dialogue.length - 1) {
              setCurrentDialogueIndex(currentDialogueIndex + 1);
            }
          }}
          dialogue={dialoghi.dialogue[currentDialogueIndex]}
        />
      )}
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
          },
          {
            id: "stivali",
            shape: "poly",
            coords: [
              1320, 1840, 1349, 1819, 1409, 1826, 1416, 1960, 1423, 1999, 1395,
              2010, 1352, 2003, 1306, 2017, 1250, 1992, 1320, 1957,
            ],
          },
          {
            id: "mattoni",
            shape: "circle",
            coords: [2704, 1854, 155],
          },
          {
            id: "armadio",
            shape: "rect",
            coords: [1243, 676, 1991, 1803],
          },
          {
            id: "mangiatoia",
            shape: "poly",
            coords: [14, 1481, 99, 1792, 756, 1707, 847, 1439, 713, 1368],
          },
          {
            id: "fieno",
            shape: "rect",
            coords: [3255, 1877, 3993, 2241],
          },
        ]}
      />
    </div>
  );
};

export default Scena4;
