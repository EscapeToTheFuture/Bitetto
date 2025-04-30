import React from 'react';
import Atrio1 from "../assets/images/backGrounds/Atrio-1.png";
import Atrio2 from "../assets/images/backGrounds/Atrio-2.png";
import Atrio3 from "../assets/images/backGrounds/Atrio-3.png";
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
      ];

      const [bgImage, setBgImage] = useState(0);

    return (
        <section className='flex items-center justify-center'>
            <ImageMapper
            imgWidth={1920}
            parentWidth={window.innerWidth > 1920 ? 1920 : window.innerWidth}
            responsive={true}
            natural
            src={atrios[bgImage].src}
            name="atrio"
            onClick={(area, _, event) => {
                if (area.id === "corridoio"){
                    navigate("/scena2");
                }
            }}
            areas={[
                {
                    id: "corridoio",
                    shape: "rect",
                    coords: [3275, 158, 3998, 1530], // Coordinate per il corridoio
                    fillColor: "rgba(237, 20, 61, 0.5)",
                    strokeColor: "rgba(237, 20, 61, 0.5)",
                    strokeWidth: 2,
                    preFillColor: "rgba(237, 20, 61, 0.5)",
                  },
                ]}
            />
        

        </section>
    );
};

export default Scena1;