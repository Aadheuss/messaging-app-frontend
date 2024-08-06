import styles from "./Loader.module.css";
import PropTypes from "prop-types";

const Loader = ({ type = "spinner", size, colorOne, colorTwo }) => {
  return (
    <div
      className={styles.loaderContainer}
      style={{ width: size, height: size }}
    >
      <div
        className={styles[type]}
        style={{
          "--color": colorOne,
          "--color-1": colorTwo,
          width: size,
          height: size,
        }}
      ></div>
    </div>
  );
};

Loader.propTypes = {
  type: PropTypes.oneOf(["spinner", "dots"]),
  size: PropTypes.string,
  colorOne: PropTypes.string,
  colorTwo: PropTypes.string,
};

export default Loader;
