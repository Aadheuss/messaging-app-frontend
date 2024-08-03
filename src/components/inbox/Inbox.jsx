import { useState, useContext, Suspense } from "react";
import styles from "./Inbox.module.css";
import { UserContext } from "../context/UserContext";
import Loader from "../loader/Loader";
import sendIcon from "../../assets/images/send.svg";
import { Await, defer, Form, useLoaderData, useParams } from "react-router-dom";

const Inbox = () => {
  const [rows, setRows] = useState(1);
  const [inputTxt, setInputTxt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { user } = useContext(UserContext);
  const { inbox } = useLoaderData();
  const { inboxid } = useParams();

  function htmlDecode(input) {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  const resetInput = () => {
    setRows(1);
    setInputTxt("");
  };

  const submitForm = async (e) => {
    if (!inputTxt) {
      e.preventDefault();
      console.log("Prevented from sending an empty message");
      return;
    }

    resetInput();
  };

  const monitorInput = (e) => {
    const rows = e.target.rows;
    e.target.rows = 1;
    const computedValue = window.getComputedStyle(e.target);

    if (computedValue) {
      const padding = Number(
        computedValue.getPropertyValue("padding").replace("px", "")
      );
      const lineHeight = Number(
        computedValue.getPropertyValue("line-height").replace("px", "")
      );

      const scrollHeight = e.target.scrollHeight;

      const numOfRows = (scrollHeight - padding * 2) / lineHeight;

      if (numOfRows >= rows) {
        e.target.rows = rows;
      }

      setRows(numOfRows < 6 ? numOfRows : 5);
    }

    setInputTxt(e.target.value);
  };

  const activateFocus = () => {
    setIsFocused(true);
  };

  const deactivateFocus = () => {
    setIsFocused(false);
  };

  return (
    <Suspense>
      <Await fallback={<Loader type="dots" />} resolve={inbox}>
        {(inbox) => (
          <div className={styles.inboxWrapper}>
            <ul className={styles.inbox}>
              {inbox &&
                inbox.map((message) => {
                  const isUser = message.user._id.toString() === user._id;
                  return (
                    <li
                      className={isUser ? styles.messageUser : styles.message}
                      key={message._id}
                    >
                      <p className={styles.text}>
                        {htmlDecode(message.message)}
                      </p>
                    </li>
                  );
                })}
            </ul>
            <Form
              className={styles.messageBox}
              onSubmit={submitForm}
              id={`inbox-${inboxid}`}
              method="post"
              onReset={resetInput}
            >
              <div className={styles.inputContainer}>
                <label
                  className={
                    inputTxt || isFocused ? styles.labelHidden : styles.label
                  }
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  rows={rows}
                  id="message"
                  name="message"
                  onFocus={activateFocus}
                  onBlur={deactivateFocus}
                  onChange={monitorInput}
                  className={styles.textarea}
                  value={inputTxt}
                ></textarea>

                <button className={styles.msgButton} type="submit">
                  <img className={styles.icon} src={sendIcon} alt="send"></img>
                </button>
              </div>
            </Form>
          </div>
        )}
      </Await>
    </Suspense>
  );
};

export default Inbox;

const InboxLoader = ({ params }) => {
  const inbox = fetch(`http://localhost:3000/user/inbox/${params.inboxid}`, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.error) {
        throw new Error(data.error);
      }

      return data.inbox;
    });

  return defer({ inbox });
};

const InboxAction = async ({ request, params }) => {
  const inboxid = params.inboxid;
  const requestFormData = await request.formData();
  const message = requestFormData.get("message");

  let formData = new URLSearchParams();
  formData.append("message", message);

  const res = await fetch(
    `http://localhost:3000/user/inbox/${inboxid}/message`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      credentials: "include",
      body: formData,
    }
  );

  const resData = await res.json();

  if (resData.error) {
    throw new Error(resData.error);
  }

  const inbox = resData.data.inbox;

  return { inbox };
};

export { InboxLoader, InboxAction };
