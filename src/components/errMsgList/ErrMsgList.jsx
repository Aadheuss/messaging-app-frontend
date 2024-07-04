import styles from "./ErrMsgList.module.css";
import PropTypes from "prop-types";

const ErrMsgList = ({ errMsg }) => {
  return (
    <ul className={styles.errMsgContainer}>
      {errMsg.map((msg, index) => (
        <li key={index} className={styles.msg}>
          {msg}
        </li>
      ))}
    </ul>
  );
};

ErrMsgList.propTypes = {
  errMsg: PropTypes.arrayOf(PropTypes.string),
};

export default ErrMsgList;
