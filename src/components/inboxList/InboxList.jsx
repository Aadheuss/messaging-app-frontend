import styles from "./InboxList.module.css";
import { useContext } from "react";
import { InboxListContext } from "../context/InboxListContext";
import { Link, useParams } from "react-router-dom";

const InboxList = () => {
  const { inboxList } = useContext(InboxListContext);
  const { inboxid } = useParams();

  function htmlDecode(input) {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  return (
    <ul className={styles.inboxList}>
      {inboxList ? (
        inboxList.length > 0 ? (
          inboxList.map((inbox) => {
            const isActive = inbox.inbox._id === inboxid;
            return (
              <li className={styles.inboxItem} key={inbox.inbox._id}>
                <Link className={styles.inboxLink} to={`${inbox.inbox._id}`}>
                  <button
                    className={
                      isActive ? styles.activeInbox : styles.inboxButton
                    }
                    type="button"
                  >
                    <figure className={styles.inboxName}>
                      <figcaption className={styles.inboxNameText}>
                        {inbox.participants[0].user.username}
                      </figcaption>
                    </figure>
                    <blockquote className={styles.blockquote}>
                      <p className={styles.inboxMessage}>
                        {htmlDecode(inbox.inbox.last_message.message)}
                      </p>
                    </blockquote>
                  </button>
                </Link>
              </li>
            );
          })
        ) : (
          <li>No messages yet</li>
        )
      ) : null}
    </ul>
  );
};

export default InboxList;
