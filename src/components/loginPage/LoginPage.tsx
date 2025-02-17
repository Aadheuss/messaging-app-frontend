import styles from "./LoginPage.module.css";
import InputContainer from "../inputContainer/InputContainer";
import Loader from "../loader/Loader";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    setIsLoading(true);

    const startup = () => {
      setIsLoading(false);
      setIsMounted(true);
    };

    startup();
    //eslint-disable-next-line
  }, [user]);

  const submitForm = async (e) => {
    e.preventDefault();

    setIsLoading(true);

    let formData = new URLSearchParams();
    formData.append("username", e.target.elements.username.value);
    formData.append("password", e.target.elements.password.value);

    try {
      const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        credentials: "include",
        body: formData,
      });

      const resData = await res.json();

      if (resData.error) {
        if (resData.error.status === 404) {
          navigate("/error");
        }
        setErrMsg({
          error: {
            ...resData.error,
            details: resData.error.details.msg.map((msg) => {
              const path = msg.split(" ").includes("username")
                ? "username"
                : "password";

              return {
                msg: msg,
                path: path,
              };
            }),
          },
        });
      } else {
        const currentUser = resData.user;
        window.localStorage.setItem("user", JSON.stringify(currentUser));

        setUser(currentUser);
        setErrMsg(null);
        navigate("/");
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
      {isMounted && (
        <div className={styles.wrapper}>
          <main className={styles.signupPage}>
            <h1 className={styles.greeting}>
              Login to msg<span className={styles.logoTxt}>Chat</span>
            </h1>
            <form
              className={styles.form}
              onSubmit={submitForm}
              id="login"
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
                autoComplete="current-password"
              />
              <div>
                <button className={styles.signupBtn}>Login</button>
              </div>
            </form>
          </main>
        </div>
      )}
    </>
  );
};

export default LoginPage;
