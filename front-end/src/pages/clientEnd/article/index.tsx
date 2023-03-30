import React from "react";
import styles from "./index.module.scss";
const Article = () => {
  return (
    <div className={styles.root}>
      <div className={styles.randomArticle}>精选文章</div>
      <div className={styles.articleList}>文章列表</div>
    </div>
  );
};

export default Article;
