import styles from "./HomePage.module.css";
import { Link, Outlet } from "react-router-dom";
import octoconvo from "../../assets/images/octoconvo.png";
import Nav from "../../components/Nav/Nav";

const HomePage = () => {
  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link className={styles.itemOne} to="/">
          <span>
            <img className={styles.logo} src={octoconvo} />
          </span>
          <p className={styles.logoLink}>OCTOCONVO</p>
        </Link>
        <Nav />
      </header>
      <main className={styles.home}>
        <div>
          <h2 className={styles.h2}>
            Welcome to octoconvo <br></br> The place to chat and <br /> hang out
            with your friends
          </h2>
          <p className={styles.details}>
            Have fun and chill with your friends on octoconvo. <br />
            build engaging communities and chat with other people.
          </p>
        </div>
        <div className={styles.imgWrapper1}>
          <img className={styles.img} />
        </div>
      </main>
    </div>
  );
};

export default HomePage;
