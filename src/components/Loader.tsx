import React from "react";
import styles from "./css/loader.module.css";
const Loader = () => {
  return (
    <div className={styles["loader"]}>
      <div className={styles["loader-spinner"]}></div>
    </div>
  );
};

export default Loader;
