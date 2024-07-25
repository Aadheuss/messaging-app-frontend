import styles from "./Loader.module.css";
import PropTypes from "prop-types";

const Loader = ({ type = "spinner" }) => {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles[type]}></div>
    </div>
  );
};

Loader.propTypes = {
  type: PropTypes.oneOf(["spinner", "dots"]),
};

export default Loader;
