import InputContainer from "../inputContainer/InputContainer";
import styles from "./SignupPage.module.css";

const SignupPage = () => {
  return (
    <div className={styles.signupPageContainer}>
      <main className={styles.signupPage}>
        <h1 className={styles.greeting}>
          Welcome to msg<span className={styles.logoTxt}>Chat</span>, please
          sign up to start chatting
        </h1>
        <form
          className={styles.form}
          id="signup"
          action="http://localhost:3000/users/signup"
          method="post"
        >
          <InputContainer
            id="username"
            type="text"
            name="username"
            isRequired={false}
            autoComplete={true}
            text="Username"
          />
          <InputContainer
            id="password"
            type="password"
            name="password"
            isRequired={true}
            autoComplete={false}
            text="Password"
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
