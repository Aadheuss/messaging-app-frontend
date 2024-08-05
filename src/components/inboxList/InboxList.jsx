import { Suspense } from "react";
import styles from "./InboxList.module.css";
import { Await, Link, useLoaderData, useParams } from "react-router-dom";
import Loader from "../loader/Loader";

const InboxList = () => {
  const { inboxes } = useLoaderData();
  const { inboxid } = useParams();

  function htmlDecode(input) {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  return (
    <Suspense fallback={<Loader />}>
      <Await resolve={inboxes}>
        {(inboxes) => {
          const inboxList = inboxes;
          return (
            <ul className={styles.inboxList}>
              {inboxList ? (
                inboxList.length > 0 ? (
                  inboxList.map((inbox) => {
                    const isActive = inbox.inbox._id === inboxid;
                    return (
                      <li className={styles.inboxItem} key={inbox.inbox._id}>
                        <Link
                          className={styles.inboxLink}
                          to={`${inbox.inbox._id}`}
                        >
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
        }}
      </Await>
    </Suspense>
  );
};

export default InboxList;
