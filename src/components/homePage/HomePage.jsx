import styles from "./HomePage.module.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import Nav from "../nav/Nav";
import { useEffect } from "react";
import { isAuthenticated } from "../../utils/authentication";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkUser = async () => {
      try {
        const isUser = await isAuthenticated();
        if (!isUser) {
          navigate("/login");
        }
      } catch (err) {
        console.log(err);
        navigate("/error");
      }
    };

    checkUser();
  }, []);

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
