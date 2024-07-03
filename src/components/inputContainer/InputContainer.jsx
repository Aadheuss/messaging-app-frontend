import styles from "./InputContainer.module.css";
import PropTypes from "prop-types";
import { useState } from "react";

const InputContainer = ({ id, type, name, isRequired, autoComplete, text }) => {
  const [inputTxt, setInputTxt] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const monitorInput = (e) => {
    setInputTxt(e.target.value.length);
  };

  const activateFocus = () => {
    setIsFocused(true);
  };

  const deactivateFocus = () => {
    setIsFocused(false);
  };

  return (
    <div className={styles.inputContainer}>
      <label
        className={inputTxt || isFocused ? styles.labelHidden : styles.label}
        htmlFor={id}
      >
        {text}
      </label>
      <input
        className={isFocused ? styles.input : styles.inputHidden}
        onChange={monitorInput}
        onFocus={activateFocus}
        onBlur={deactivateFocus}
        type={type}
        id={id}
        name={name}
        required={isRequired}
        placeholder={text}
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
