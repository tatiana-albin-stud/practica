import React from "react";
import styles from "./Footer.module.scss";
import dayjs from "dayjs";

const Footer = () => {
  const currentYear = dayjs().year();
  return (
    <div className={styles.mainContainer}>
      {/* <p className={styles.textContent}>
        © {currentYear}
        <b> INBUSINESS </b>. All rights reserved
      </p> */}
    </div>
  );
};

export default Footer;
