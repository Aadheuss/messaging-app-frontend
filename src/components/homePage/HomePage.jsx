import styles from "./HomePage.module.css";
import { Link, Outlet } from "react-router-dom";
import Nav from "../nav/Nav";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <h1 className={styles.logo}>
          <Link className={styles.logoLink} href="/">
            msg<span className={styles.logoTxt}>Chat</span>
          </Link>
        </h1>
        <Nav />
      </header>
      <main className={styles.home}>
        <Outlet />
      </main>
    </div>
  );
};

export default HomePage;
