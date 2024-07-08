import InputContainer from "../inputContainer/InputContainer";
import Loader from "../loader/Loader";
import styles from "./SignupPage.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignupPage = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const submitForm = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    let formData = new URLSearchParams();
    formData.append("username", e.target.elements.username.value);
    formData.append("password", e.target.elements.password.value);

    try {
      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formData,
      });

      const resData = await res.json();

      if (resData.error) {
        if (resData.error.status === 404) {
          navigate("/error");
        }
        setErrMsg(resData);
      } else {
        setErrMsg(null);
      }
    } catch (err) {
      navigate("/error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}

      <main className={styles.signupPage}>
        <h1 className={styles.greeting}>
          Welcome to msg<span className={styles.logoTxt}>Chat</span>
        </h1>
        <p className={styles.formHeading}>Sign up to start chatting</p>
        <form
          className={styles.form}
          onSubmit={submitForm}
          id="signup"
          action=""
          method="post"
        >
          <InputContainer
            err={{
              errMsg: errMsg ? errMsg.error.details : null,
              setErrMsg: setErrMsg,
            }}
            id="username"
            type="text"
            name="username"
            isRequired={true}
            autoComplete={true}
            text="Username"
          />
          <InputContainer
            setErrMsg={setErrMsg}
            err={{
              errMsg: errMsg ? errMsg.error.details : null,
              setErrMsg: setErrMsg,
            }}
            id="password"
            type="password"
            name="password"
            isRequired={true}
            text="Password"
            length={{ min: 8, max: 0 }}
            clientValidation={["minimum of 8 digits"]}
            autoComplete={"new-password"}
          />
          <div>
            <button className={styles.signupBtn}>Sign up</button>
          </div>
        </form>
      </main>
    </>
  );
};

export default SignupPage;
