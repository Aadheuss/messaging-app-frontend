import styles from "./ErrMsgList.module.css";
import PropTypes from "prop-types";

const ErrMsgList = ({ id, errMsg }) => {
  return (
    <ul className={styles.errMsgContainer} id={`${id}-error`} role="alert">
      {errMsg.map((msg, index) => (
        <li key={index} className={styles.msg}>
          <p>{msg}</p>
        </li>
      ))}
    </ul>
  );
};

ErrMsgList.propTypes = {
  id: PropTypes.string,
  errMsg: PropTypes.arrayOf(PropTypes.string),
};

export default ErrMsgList;
