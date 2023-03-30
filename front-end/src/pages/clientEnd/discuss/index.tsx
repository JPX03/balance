import React from "react";
import styles from "./index.module.scss";
import { NavLink, useNavigate } from "react-router-dom";
const Discuss = () => {
  const navigate = useNavigate();
  const showAsk = () => {
    navigate("/client/ask", { replace: false });
  };
  return (
    <div className={styles.root}>
      <img src="/imgs/ask.png" className={styles.img1}></img>
      <span className={styles.ask} onClick={() => showAsk()}>
        提问
      </span>
      <div className={styles.randomAsk}>精选问答</div>
      <div className={styles.askList}>问答列表</div>
    </div>
  );
};

export default Discuss;
