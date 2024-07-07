import styles from "./NotFoundErrPage.module.css";

const NotFoundErrPage = () => {
  return (
    <main className={styles.container}>
      <p className={styles.headerTxt}>404</p>
      <p className={styles.txtMain}>Page not found</p>
      <p className={styles.txt}>The Page you are looking for doesn't exist. </p>
    </main>
  );
};

export default NotFoundErrPage;
