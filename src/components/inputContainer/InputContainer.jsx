import styles from "./InputContainer.module.css";
import PropTypes from "prop-types";

const InputContainer = ({ id, type, name, isRequired, autoComplete, text }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label} htmlFor={id}>
        {text}
      </label>
      <input
        className={styles.input}
        type={type}
        id={id}
        name={name}
        required={isRequired}
        placeholder=" "
        autoComplete={autoComplete ? id : null}
      ></input>
    </div>
  );
};

InputContainer.propTypes = {
  id: PropTypes.string,
  type: PropTypes.oneOf(["text", "password"]),
  name: PropTypes.string,
  isRequired: PropTypes.bool,
  autoComplete: PropTypes.bool,
  text: PropTypes.string,
};

export default InputContainer;
