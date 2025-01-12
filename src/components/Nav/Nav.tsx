import styles from "./Nav.module.css";
import { Link } from "react-router-dom";
import { logout } from "../../auth/authentication";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function Nav() {
  const { setUser, user } = useContext(UserContext);

  return (
    <nav>
      <ul className={styles.navList}>
        {user ? (
          <>
            <li className={styles.navItem}>
              <Link className={styles.navItemLink} to="/profile">
                <p className={styles.txt}>Profile</p>
              </Link>
            </li>
            <li className={styles.navItem}>
              <button
                className={styles.logoutBtn}
                onClick={(e) => logout({ e, fn: () => setUser(null) })}
              >
                Log out
              </button>
            </li>
          </>
        ) : (
          <>
            <li className={styles.navItem}>
              <Link className={styles.navItemLink} to="/signup">
                <p className={styles.txt}>Sign up</p>
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link className={styles.navItemLink} to="/login">
                <p className={styles.txt}>Log in</p>
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Nav;
