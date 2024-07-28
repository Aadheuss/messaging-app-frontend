import styles from "./InboxList.module.css";
import { useContext } from "react";
import PropTypes from "prop-types";
import { InboxListContext } from "../context/inboxListContext/inboxListContext";

const InboxList = ({ activeInbox, selectInbox }) => {
  const { inboxList } = useContext(InboxListContext);

  function htmlDecode(input) {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  return (
    <ul className={styles.inboxList}>
      {inboxList ? (
        inboxList.length > 0 ? (
          inboxList.map((inbox) => {
            const isActive = inbox.inbox._id === activeInbox;
            return (
              <li className={styles.inboxItem} key={inbox.inbox._id}>
                <button
                  className={isActive ? styles.activeInbox : styles.inboxButton}
                  type="button"
                  onClick={selectInbox.bind(this, inbox.inbox._id)}
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

InboxList.propTypes = {
  inboxList: PropTypes.arrayOf(PropTypes.object),
  activeInbox: PropTypes.string,
  selectInbox: PropTypes.func,
};

export default InboxList;
