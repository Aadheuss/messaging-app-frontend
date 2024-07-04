import InputContainer from "../inputContainer/InputContainer";
import styles from "./SignupPage.module.css";
import { useState } from "react";

const SignupPage = () => {
  const [errMsg, setErrMsg] = useState(null);

  const submitForm = async (e) => {
    e.preventDefault();

    let formData = new URLSearchParams();
    formData.append("username", e.target.elements.username.value);
    formData.append("password", e.target.elements.password.value);

    const res = await fetch("http://localhost:3000/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData,
    });

    const resData = await res.json();

    if (resData.error) {
      setErrMsg(resData);
    } else {
      setErrMsg(null);
    }
  };

  return (
    <div className={styles.signupPageContainer}>
      <main className={styles.signupPage}>
        <h1 className={styles.greeting}>
          Welcome to msg<span className={styles.logoTxt}>Chat</span>, please
          sign up to start chatting
        </h1>
        <form
          className={styles.form}
          onSubmit={submitForm}
          id="signup"
          action=""
          method="post"
        >
          <InputContainer
            errMsg={errMsg ? errMsg.error.details : null}
            id="username"
            type="text"
            name="username"
            isRequired={true}
            autoComplete={true}
            text="Username"
          />
          <InputContainer
            errMsg={errMsg ? errMsg.error.details : null}
            id="password"
            type="password"
            name="password"
            isRequired={true}
            text="Password"
            length={{ min: 8, max: 0 }}
            clientValidation={["minimum of 8 digits"]}
          />
          <div>
            <button className={styles.signupBtn}>Sign up</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignupPage;
