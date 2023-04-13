import React from "react";
import PsychologyIcon from "@mui/icons-material/Psychology";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import { GeneralAdministrationButton } from "lib/components/Buttons/buttons.jsx";
import styles from "./MemberDashboard.module.scss";
import HandshakeIcon from "@mui/icons-material/Handshake";

const MemberDashboard = () => {
  const generalAdministrationData = [
    {
      id: 1,
      text: "Respect reciproc",
      icon: <HandshakeIcon />,
    },
    {
      id: 2,
      text: "Gândire pozitivă",
      icon: <PsychologyIcon />,
    },
    {
      id: 3,
      text: "Prietenie și suport",
      icon: <Diversity3Icon />,
    },
    {
      id: 4,
      text: "Curaj și onoare",
      icon: <MilitaryTechIcon />,
    },
  ];

  const title = (name) => {
    return <h2 className={styles.title}>{name}</h2>;
  };

  const leftSide = generalAdministrationData.slice(0, 2).map((data) => (
    <div key={data.id}>
      <GeneralAdministrationButton text={data.text} icon={data.icon} />
    </div>
  ));

  const rightSide = generalAdministrationData.slice(2).map((data) => (
    <div key={data.id}>
      <GeneralAdministrationButton text={data.text} icon={data.icon} />
    </div>
  ));

  return (
    <div>
      <div>{title("Viziune")}</div>
      <div className={styles.title}>
        InBUSINESS Club oferă un mediu de afaceri excelent în care membrii se
        întâlnesc pentru a face schimb de idei și practici cu scopul de a-și
        <b> maximiza dezvoltarea personală și succesul financiar.</b>
      </div>
      <div>{title("Valori")}</div>
      <div className={styles.mainContainer}>
        <div className={styles.itemDiv}>{leftSide}</div>
        <div className={styles.itemDiv}>{rightSide}</div>
      </div>
    </div>
  );
};

export default MemberDashboard;
