import React from "react";
import HartaRo from "resources/img/Romania_Harta_Gri.png";
import styles from "./ManagerDashboard.module.scss";

const ManagerDashboard = () => {
  return (
    <div>
      <div className={styles.container}>
        {/* <img src={HartaRo} alt="hartaRo" className={styles.HartaRo} /> */}
        <img
          src={HartaRo}
          useMap="#image-map"
          className={styles.HartaRo}
          alt="hartaRo"
        />

        <map name="image-map">
          <area
            target=""
            alt="Suceava"
            title="Suceava"
            href=""
            coords="317,88,571,140"
            shape="rect"
            onClick={(e) => {
              e.preventDefault(); // prevent default behavior
              alert("Suseava");
            }}
          />
          <area
            target=""
            alt="Botosani"
            title="Botosani"
            href=""
            coords="595,57,647,90"
            shape="rect"
            onClick={(e) => {
              e.preventDefault(); // prevent default behavior
              alert("You clicked on Botosani uaaaai");
            }}
          />
          <area
            target=""
            alt="Iasi"
            title="Iasi"
            href=""
            coords="1279,315,1181,248"
            shape="rect"
          />
          <area
            target=""
            alt="Neamt"
            title="Neamt"
            href=""
            coords="1028,337,1143,400"
            shape="rect"
          />
        </map>
      </div>
    </div>
  );
};

export default ManagerDashboard;
