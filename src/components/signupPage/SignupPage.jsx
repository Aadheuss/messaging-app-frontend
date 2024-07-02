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
          action="http://localhost:3000/signup"
          method="post"
        >
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="username">
              Username
            </label>
            <input
              className={styles.input}
              type="text"
              id="username"
              name="username"
              required
              placeholder=" "
              autoComplete="username"
            ></input>
          </div>
          <div className={styles.inputContainer}>
            <label className={styles.label} htmlFor="password">
              Password
            </label>
            <input
              className={styles.input}
              type="text"
              id="password"
              name="password"
              required
              placeholder=" "
            ></input>
          </div>
          <div>
            <button className={styles.signupBtn}>Sign up</button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default SignupPage;
