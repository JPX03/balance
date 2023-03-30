import React from "react";
import styles from "./index.module.scss";
import { Input, Button } from "antd-v5";

const Ask: React.FC = () => {
  const { TextArea } = Input;
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    console.log("Change:", e.target.value);
  };

  return (
    <div className={styles.askContainer}>
      <div className={styles.title}>发布问题</div>
      <Input showCount maxLength={20} onChange={onChange} style={{ marginTop: "5vh" }} />
      <TextArea showCount maxLength={300} onChange={onChange} style={{ marginTop: "5vh", height: "40vh" }} />
      <Button shape="round" style={{ marginTop: "5vh", marginRight: "2vw" }}>
        取消
      </Button>
      <Button shape="round" type="primary" style={{ marginTop: "5vh" }}>
        发布
      </Button>
    </div>
  );
};

export default Ask;
