import styles from "./InputContainer.module.css";
import PropTypes from "prop-types";
import { useState } from "react";
import ErrMsgList from "../errMsgList/ErrMsgList";

const InputContainer = ({
  err,
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
  const myErrMsg = err.errMsg
    ? err.errMsg.filter((msg) => msg.path === name).map((msg) => msg.msg)
    : [];

  const monitorInput = (e) => {
    setInputTxt(e.target.value);
    err.setErrMsg(null);
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
          <ErrMsgList id={id} errMsg={myErrMsg} />
        </div>
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
          autoComplete={
            autoComplete
              ? typeof autoComplete === "string"
                ? autoComplete
                : id
              : null
          }
          aria-describedby={`${id}-error`}
          value={inputTxt}
        ></input>
      </div>
      {clientValidation && isFocused && (
        <ul className={styles.clientValidation} id={`${id}-error`}>
          {clientValidation.map((rule, index) => (
            <li key={index} className={styles.rule}>
              {rule}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

InputContainer.propTypes = {
  err: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  id: PropTypes.string,
  type: PropTypes.oneOf(["text", "password"]),
  name: PropTypes.string,
  isRequired: PropTypes.bool,
  autoComplete: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  clientValidation: PropTypes.arrayOf(PropTypes.string),
  length: PropTypes.shape({ min: PropTypes.number, max: PropTypes.number }),
  text: PropTypes.string,
};

export default InputContainer;
