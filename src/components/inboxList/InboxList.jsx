import { Suspense } from "react";
import styles from "./InboxList.module.css";
import { Await, Link, useLoaderData, useParams } from "react-router-dom";
import ContentLoader from "react-content-loader";

const InboxListcontentLoader = (props) => (
  <ContentLoader
    speed={2}
    width={"100%"}
    height={150}
    backgroundColor="#e3e3e1"
    foregroundColor="#A9A9A8"
    viewBox="0 0 250 150"
    preserveAspectRatio="none"
    {...props}
  >
    <rect x="0" y="0" rx="5" ry="5" width="100%" height="1.5em" />
    <rect
      x="0"
      y="calc(1.5em + 1.5em)"
      rx="5"
      ry="5"
      width="100%"
      height="1.5em"
    />
    <rect x="0" y="calc(3em + 3em)" rx="5" ry="5" width="100%" height="1.5em" />
  </ContentLoader>
);

const InboxList = () => {
  const { inboxes } = useLoaderData();
  const { inboxid } = useParams();

  function htmlDecode(input) {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  }

  return (
    <Suspense
      fallback={
        <div className={styles.loaderWrapper}>
          <InboxListcontentLoader />
        </div>
      }
    >
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
