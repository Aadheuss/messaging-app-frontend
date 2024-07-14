import styles from "./HomePage.module.css";
import Loader from "../loader/Loader";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext/UserContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const checkLogin = async () => {
      if (!user) {
        navigate("/login");
      } else {
        try {
          const id = user._id;

          const res = await fetch(`http://localhost:3000/user/${id}`, {
            credentials: "include",
          });
          const resData = await res.json();

          if (resData.error) {
            console.log("error");
          } else {
            setUserData(resData.data.user);
          }
        } catch (err) {
          navigate("/error");
        }
      }

      setIsLoading(false);
    };

    checkLogin();
  }, [user]);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div className={styles.wrapper}>
          <header className={styles.header}>
            <h1 className={styles.logo}>
              <a className={styles.logoLink} href="/">
                msg<span className={styles.logoTxt}>Chat</span>
              </a>
            </h1>
            <nav>
              <ul className={styles.navList}>
                <li className={styles.navItem}>
                  <a className={styles.navItemLink} href="/profile">
                    {userData && userData.username}
                  </a>
                </li>
              </ul>
            </nav>
          </header>
          <main className={styles.home}>
            <h2 className={styles.chatHeader}>
              Welcome {userData && userData.username}, start chatting here
            </h2>
          </main>
        </div>
      )}
    </>
  );
};

export default HomePage;
