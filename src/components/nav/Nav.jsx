import styles from "./Nav.module.css";
import logoutIcon from "../../assets/images/logout.svg";
import logoutIconHover from "../../assets/images/logout_hover.svg";
import { UserContext } from "../context/UserContext";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

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
          <Link className={styles.navItemLink} to="/inboxes">
            inbox
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navItemLink} to="/profile">
            {user && user.username}
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link className={styles.navItemLink} to="/logout" onClick={logout}>
            <img
              onMouseEnter={(e) => (e.target.src = logoutIconHover)}
              onMouseLeave={(e) => (e.target.src = logoutIcon)}
              className={styles.logoutIcon}
              src={logoutIcon}
              alt="logout"
            />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
