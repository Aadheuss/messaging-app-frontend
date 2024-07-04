import styles from "./InputContainer.module.css";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import ErrMsgList from "../errMsgList/ErrMsgList";

const InputContainer = ({
  errMsg,
  id,
  type,
  name,
  isRequired,
  clientValidation = null,
  length,
  autoComplete,
  text,
}) => {
  const [inputTxt, setInputTxt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const myErrMsg = errMsg
    ? errMsg.filter((msg) => msg.path === name).map((msg) => msg.msg)
    : [];

  const monitorInput = (e) => {
    setInputTxt(e.target.value);
  };

  const activateFocus = () => {
    setIsFocused(true);
  };

  const deactivateFocus = () => {
    setIsFocused(false);
  };

  return (
    <div>
      {myErrMsg.length > 0 && (
        <div className={styles.inputContainerWidth}>
          <ErrMsgList errMsg={myErrMsg} />
        </div>
      )}
      {(inputTxt || isFocused) && (
        <div className={styles.clientValidation}>{clientValidation}</div>
      )}
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
          minLength={length ? (length.min > 0 ? length.min : null) : null}
          placeholder={text}
          autoComplete={autoComplete ? id : null}
          value={inputTxt}
        ></input>
      </div>
    </div>
  );
};

InputContainer.propTypes = {
  errMsg: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  id: PropTypes.string,
  type: PropTypes.oneOf(["text", "password"]),
  name: PropTypes.string,
  isRequired: PropTypes.bool,
  autoComplete: PropTypes.bool,
  clientValidation: PropTypes.string,
  length: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }),
  text: PropTypes.string,
};

export default InputContainer;
