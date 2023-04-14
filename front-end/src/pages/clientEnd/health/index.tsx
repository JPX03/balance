import React from "react";
import { Col, Row, Card } from "antd-v5";
import Weight from "./component/weight";
import BloodFat from "./component/bloodFat";
import BloodPressure from "./component/bloodPressure";
import BloodSugar from "./component/bloodSugar";
import BodyFatRatio from "./component/bodyFatRatio";
import styles from "./index.module.scss";

const Health: React.FC = () => {
  return (
    <div className={styles.root}>
      <div className={styles.container}>
        <div className={styles.title}>数据看板</div>
        <Row style={{ marginBottom: "5vh" }}>
          <Col span={24}>
            <Weight></Weight>
          </Col>
        </Row>
        <Row style={{ marginBottom: "5vh" }}>
          <Col span={12}>
            <BodyFatRatio></BodyFatRatio>
          </Col>
          <Col span={12}>
            <BloodFat></BloodFat>
          </Col>
        </Row>
        <Row style={{ marginBottom: "5vh" }}>
          <Col span={12}>
            <BloodPressure></BloodPressure>
          </Col>
          <Col span={12}>
            <BloodSugar></BloodSugar>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default Health;
