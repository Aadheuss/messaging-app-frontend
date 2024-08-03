import styles from "./Nav.module.css";
import logoutIcon from "../../assets/images/logout.svg";
import logoutIconHover from "../../assets/images/logout_hover.svg";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://localhost:3000/logout`, {
        credentials: "include",
      });

      const resData = await res.json();

      if (resData.error) {
        console.log(resData.error);
      } else {
        window.localStorage.removeItem("user");
        setUser(null);
        navigate("/login");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <nav>
      <ul className={styles.navList}>
        <li className={styles.navItem}>
          <a className={styles.navItemLink} href="/profile">
            {user && user.username}
          </a>
        </li>
        <li className={styles.navItem}>
          <a className={styles.navItemLink} href="/logout" onClick={logout}>
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
  );
};

export default Nav;
