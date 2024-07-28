import { useEffect, useState, useContext } from "react";
import styles from "./Inbox.module.css";
import PropTypes from "prop-types";
import { UserContext } from "../context/userContext/UserContext";
import Loader from "../loader/Loader";
import sendIcon from "../../assets/images/send.svg";
import { useNavigate } from "react-router-dom";
import { InboxListContext } from "../context/inboxListContext/inboxListContext";

const Inbox = ({ inboxid }) => {
  const { inboxList, setInboxList } = useContext(InboxListContext);
  const navigate = useNavigate();
  const [rows, setRows] = useState(1);
  const [inputTxt, setInputTxt] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [inbox, setInbox] = useState(null);

  function htmlDecode(input) {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  useEffect(() => {
    const fetchInbox = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:3000/user/inbox/${inboxid}`, {
          credentials: "include",
        });

        const resData = await res.json();

        if (resData.error) {
          console.log(resData.error);
        } else {
          setInbox(resData.inbox);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInbox();

    return setInbox(null);
  }, [inboxid]);

  const sendMessage = async (e) => {
    setInputTxt("");
    setRows(1);
    e.preventDefault();

    let formData = new URLSearchParams();
    formData.append("message", inputTxt);

    const currentInbox = inboxList.find((inbox) => inbox.inbox._id === inboxid);
    const currentInboxIndex = inboxList.findIndex(
      (inbox) => inbox.inbox._id === inboxid
    );

    if (!inputTxt) {
      return;
    }

    try {
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
        console.log(resData.error);
      } else {
        const updatedInboxList = [...inboxList];
        const updatedInbox = {
          ...currentInbox,
          inbox: resData.data.inbox,
        };
        updatedInboxList[currentInboxIndex] = updatedInbox;
        setInboxList(updatedInboxList);
        setInbox([...inbox, resData.data.inbox.last_message]);
      }
    } catch (err) {
      console.log(err);
      navigate("/error");
    } finally {
      setIsLoading(false);
    }
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
    <div className={styles.inboxWrapper}>
      {isLoading && <Loader type="dots" />}
      <ul className={styles.inbox}>
        {inbox &&
          inbox.map((message) => {
            const isUser = message.user._id.toString() === user._id;
            return (
              <li
                className={isUser ? styles.messageUser : styles.message}
                key={message._id}
              >
                <p className={styles.text}>{htmlDecode(message.message)}</p>
              </li>
            );
          })}
      </ul>
      <form
        className={styles.messageBox}
        id={`inbox-${inboxid}`}
        action=""
        method="post"
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

          <button onClick={sendMessage} className={styles.msgButton}>
            <img className={styles.icon} src={sendIcon} alt="send"></img>
          </button>
        </div>
      </form>
    </div>
  );
};

Inbox.propTypes = {
  inboxid: PropTypes.string,
};

export default Inbox;
