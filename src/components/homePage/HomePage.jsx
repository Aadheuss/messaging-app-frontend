import styles from "./HomePage.module.css";
import Loader from "../loader/Loader";
import { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/userContext/UserContext";
import { useNavigate } from "react-router-dom";
import logoutIcon from "../../assets/images/logout.svg";
import logoutIconHover from "../../assets/images/logout_hover.svg";
import chatIcon from "../../assets/images/chat.svg";

const HomePage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [userData, setUserData] = useState(null);
  const [inboxes, setInboxes] = useState(null);
  const [isInboxActive, setIsInboxActive] = useState(false);

  const logout = async (e) => {
    setIsLoading(true);
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/logout`, {
        credentials: "include",
      });

      const resData = res.json();

      if (resData.error) {
        console.log(resData.error);
      } else {
        window.localStorage.removeItem("user");
        setUserData(null);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    const checkLogin = async () => {
      if (!user) {
        navigate("/login");
      } else {
        console.log(user);
        try {
          const id = user._id;

          const [res, resInbox] = await Promise.all([
            fetch(`http://localhost:3000/user/${id}`, {
              credentials: "include",
            }),
            fetch("http://localhost:3000/user/inboxes", {
              credentials: "include",
            }),
          ]);
          const resData = await res.json();
          const resInboxData = await resInbox.json();

          if (resData.error) {
            if (resData.error.status >= 400 && resData.error.status < 500) {
              window.localStorage.removeItem("user");
              setUser(null);
              navigate("/login");
            }
          } else {
            setUserData(resData.data.user);
            if (resInboxData.error) {
              console.log(resInboxData.error);
            } else {
              const userInboxes =
                resInboxData.inboxes.length > 0 ? resInboxData.inboxes : [];
              setInboxes(userInboxes);
            }
          }
        } catch (err) {
          navigate("/error");
        }
      }

      setIsMounted(true);
      setIsLoading(false);
    };

    checkLogin();
  }, [user]);

  return (
    <>
      {isLoading && <Loader />}
      {isMounted && (
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
                <li className={styles.navItem}>
                  <a
                    className={styles.navItemLink}
                    href="/logout"
                    onClick={logout}
                  >
                    <img
                      onMouseEnter={(e) => (e.target.src = logoutIconHover)}
                      onMouseLeave={(e) => (e.target.src = logoutIcon)}
                      className={styles.logoutIcon}
                      src={logoutIcon}
                      alt="logout"
                    />
                  </a>
                </li>
              </ul>
            </nav>
          </header>
          <main className={styles.home}>
            <div className={styles.inbox}>
              <h2 className={styles.inboxHeader}>Messages</h2>
              <ul className={styles.inbox}>
                {inboxes ? (
                  inboxes.length > 0 ? (
                    inboxes.map((inbox) => {
                      console.log({ inbox, msg: "BRo" });
                      return (
                        <li className={styles.inboxItem} key={inbox.inbox._id}>
                          <button className={styles.inboxButton} type="button">
                            <figure className={styles.inboxName}>
                              <figcaption>
                                {inbox.participants[0].user.username}
                              </figcaption>
                            </figure>
                            <blockquote className={styles.blockquote}>
                              <p className={styles.inboxMessage}>
                                {inbox.inbox.last_message.message}
                              </p>
                            </blockquote>
                          </button>
                        </li>
                      );
                    })
                  ) : (
                    <li>No messages yet</li>
                  )
                ) : null}
              </ul>
            </div>
            <ul
              className={
                isInboxActive ? styles.selectedInbox : styles.emptyInbox
              }
            >
              {isInboxActive ? (
                <li>Is Active alright</li>
              ) : (
                <li className={styles.noSelection}>
                  <img className={styles.chatIcon} src={chatIcon} alt=""></img>
                </li>
              )}
            </ul>
          </main>
        </div>
      )}
    </>
  );
};

export default HomePage;
