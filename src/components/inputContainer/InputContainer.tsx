import styles from "./InputContainer.module.css";
import PropTypes from "prop-types";
import { useState, useLayoutEffect, useRef } from "react";
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
  const inputRef = useRef(null);
  const [inputTxt, setInputTxt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [wasInitiallyAutofilled, setWasInitiallyAutofilled] = useState(false);

  useLayoutEffect(() => {
    /**
     * The field can be prefilled on the very first page loading by the browser
     * By the security reason browser limits access to the field value from JS level and the value becomes available
     * only after first user interaction with the page
     * So, even if the Formik thinks that the field is not touched by user and empty,
     * it actually can have some value, so we should process this edge case in the form logic
     */
    const checkAutofilled = () => {
      const autofilled = inputRef.current.matches("*:-webkit-autofill");
      setWasInitiallyAutofilled(autofilled);
    };

    // The time when it's ready is not very stable, so check few times
    setTimeout(checkAutofilled, 0);
    setTimeout(checkAutofilled, 125);
    setTimeout(checkAutofilled, 250);
    setTimeout(checkAutofilled, 500);
    setTimeout(checkAutofilled, 1000);
    setTimeout(checkAutofilled, 2000);
  }, [id]);

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
    <>
      {myErrMsg.length > 0 && <ErrMsgList id={id} errMsg={myErrMsg} />}
      <div className={styles.inputContainer}>
        <label
          className={
            inputTxt || isFocused || wasInitiallyAutofilled
              ? styles.labelHidden
              : styles.label
          }
          htmlFor={id}
        >
          {text}
        </label>
        <input
          ref={inputRef}
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
        ></input>
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
    </>
  );
};

InputContainer.propTypes = {
  err: PropTypes.shape({
    errMsg: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)),
    setErrMsg: PropTypes.func,
  }),
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
