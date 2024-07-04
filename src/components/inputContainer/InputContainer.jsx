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
  autoComplete,
  text,
}) => {
  const [inputTxt, setInputTxt] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const myErrMsg = errMsg
    ? errMsg.filter((msg) => msg.path === name).map((msg) => msg.msg)
    : [];

  const monitorInput = (e) => {
    setInputTxt(e.target.value.length);
  };

  const activateFocus = () => {
    setIsFocused(true);
  };

  const deactivateFocus = () => {
    setIsFocused(false);
  };

  useEffect(() => {
    setInputTxt(0);

    return () => {
      setInputTxt(0);
    };
  }, []);

  return (
    <>
      {myErrMsg.length > 0 && <ErrMsgList errMsg={myErrMsg} />}
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
    </>
  );
};

InputContainer.propTypes = {
  errMsg: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
  id: PropTypes.string,
  type: PropTypes.oneOf(["text", "password"]),
  name: PropTypes.string,
  isRequired: PropTypes.bool,
  autoComplete: PropTypes.bool,
  text: PropTypes.string,
};

export default InputContainer;
