import React from "react";
import styles from "./index.module.scss";

const ClientIndex: React.FC = () => {
  const date = new Date();
  const month = date.getMonth();
  const day = date.getDay();
  return (
    <div className={styles.root}>
      <img src="/imgs/clientIndex.gif" className={styles.img1} alt="未加载"></img>
      <div className={styles.date}>
        <div className={styles.month}>{month}月</div>
        <div className={styles.day}>{day}日</div>
        <img src="/imgs/date.png" className={styles.img2} alt="未加载"></img>
      </div>
      <div className={styles.title}>生活没有你想的那么糟</div>
      <img src="/imgs/threecolors.png" className={styles.img3} alt="未加载"></img>
    </div>
  );
};

export default ClientIndex;
