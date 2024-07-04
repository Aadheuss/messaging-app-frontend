import styles from "./ErrMsgList.module";
import PropTypes from "prop-types";

const ErrMsgList = ({ errMsg }) => {
  return (
    <ul className={styles.errMSg}>
      {errMsg.map((msg, index) => (
        <li key={index}>{msg}</li>
      ))}
    </ul>
  );
};

ErrMsgList.propTypes = {
  errMsg: PropTypes.arrayOf(PropTypes.string),
};

export default ErrMsgList;
