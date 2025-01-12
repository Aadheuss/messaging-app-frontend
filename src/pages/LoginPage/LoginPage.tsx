import styles from "./LoginPage.module.css";
import { useContext, useEffect, useRef, useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import InputContainer from "../../components/InputContainer/InputContainer";
import { UserContext } from "../../context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import {
  passwordValidation,
  usernameValidation,
} from "../../utils/formValidation";

type FormValues = {
  username: string;
  password: string;
};

type validationError = {
  field: string;
  msg: string;
  value: string;
};

const LoginPage = () => {
  // Server form validation error message
  const navigate = useNavigate();
  const redirectRef = useRef<null | HTMLDialogElement>(null);
  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  const { user, setUser } = useContext(UserContext);
  const [errMsg, setErrMsg] = useState<null | validationError>(null);
  const [isLoading, setIsLoading] = useState(false);
  const methods = useForm<FormValues>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  useEffect(() => {
    const checkloginSession = () => {
      if (user !== null && user) {
        setIsRedirecting(true);

        // Set up redirection if not currently redirecting
        if (!isRedirecting) {
          setTimeout(() => {
            setIsRedirecting(false);
            navigate("/chat");
          }, 10000);
        }

        console.log("You are logged in!");
      }
    };

    if (isRedirecting) {
      redirectRef.current?.showModal();
    }

    checkloginSession();
  }, [user, isRedirecting]);
  const checkErrValField = (err: validationError, field: string): boolean => {
    return err.field === field;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const formData = new URLSearchParams();
    formData.append("username", data.username);
    formData.append("password", data.password);

    try {
      const login = await fetch("http://localhost:3000/login", {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: formData,
      });

      const loginData = await login.json();

      // Handle error
      if (login.status >= 400) {
        if (loginData.error) {
          console.log(loginData);
          setErrMsg(loginData.error.error);
        }

        return console.log("Login failed");
      } else {
        setIsRedirecting(true);

        // Set up redirection if not currently redirecting
        if (!isRedirecting) {
          setTimeout(() => {
            setIsRedirecting(false);
            navigate("/chat");
          }, 3000);
        }
      }
    } catch (err) {
      console.log("CAUGHT ERROR: Failed to log in");
    }
  };

  return (
    <>
      <main className={styles.signupPage}>
        <dialog ref={redirectRef} className={styles.redirectLoader}>
          <p className={styles.redirectTxt}>logging in</p>
          <p className={styles.redirectTxtA}>Redirecting...</p>
        </dialog>
        <div className={styles.formContainer}>
          <div>
            <h1 className={styles.greeting}>
              Welcome back to octoconvo
              <br />
            </h1>
            <p className={styles.greeting2}>
              log in to start chatting with your friends
            </p>
          </div>

          <FormProvider {...methods}>
            <form
              className={styles.form}
              onSubmit={handleSubmit(onSubmit)}
              id="login"
              action=""
              method="post"
            >
              <InputContainer>
                {
                  <>
                    {errMsg && checkErrValField(errMsg, "username") && (
                      <span className="error-txt">{errMsg.msg}</span>
                    )}
                    {errors.username && (
                      <span className="error-txt">
                        {errors.username.message}
                      </span>
                    )}
                    <label className="label" htmlFor="username">
                      Username
                    </label>
                    <input
                      className="input"
                      id="username"
                      type="text"
                      onInput={() => setErrMsg(null)}
                      autoComplete="username"
                      {...register("username", usernameValidation)}
                    />
                  </>
                }
              </InputContainer>
              <InputContainer>
                {
                  <>
                    {errMsg && checkErrValField(errMsg, "password") && (
                      <span className="error-txt">{errMsg.msg}</span>
                    )}
                    {errors.password && (
                      <span className="error-txt">
                        {errors.password.message}
                      </span>
                    )}
                    <label className="label" htmlFor="password">
                      Password
                    </label>
                    <input
                      className="input"
                      id="password"
                      type="password"
                      autoComplete="current-password"
                      onInput={() => setErrMsg(null)}
                      {...register("password", passwordValidation)}
                    />
                  </>
                }
              </InputContainer>

              <button className={styles.signupBtn}>Login</button>
            </form>
          </FormProvider>
          <div className={styles.invContainer}>
            <h2 className={styles.signupTxt}>Don't have an account?</h2>

            <Link to="/signup" className={styles.signupLink}>
              Signup
            </Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default LoginPage;
