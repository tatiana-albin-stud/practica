import React from "react";
import styles from "./Content.module.scss";
import Footer from "lib/components/Footer/Footer";

function Content({ children }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        {/* Inner shadow */}
        <div className={styles.shadow} />
        {/* Inner content */}
        <div className={styles.content}>
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default Content;
