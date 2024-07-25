import { useEffect, useState, useContext } from "react";
import styles from "./Inbox.module.css";
import PropTypes from "prop-types";
import { UserContext } from "../context/userContext/UserContext";
import Loader from "../loader/Loader";

const Inbox = ({ inboxid }) => {
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
  return (
    <ul className={styles.inbox}>
      {isLoading && <Loader type="dots" />}
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
  );
};

Inbox.propTypes = {
  inboxid: PropTypes.string,
};

export default Inbox;
