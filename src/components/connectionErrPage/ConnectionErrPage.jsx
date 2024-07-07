import styles from "./ConnectionErrPage.module.css";
import img from "../../assets/error_FILL.svg";

const ConnectionErrPage = () => {
  return (
    <main className={styles.container}>
      <div className={styles.icon}>
        <img src={img} />
      </div>
      <p className={styles.txtMain}>Something went wrong!</p>
      <p className={styles.txt}> failed to connect to the server </p>
    </main>
  );
};

export default ConnectionErrPage;
