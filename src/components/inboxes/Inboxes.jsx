import styles from "./Inboxes.module.css";
import InboxList from "../inboxList/InboxList";
import chatIcon from "../../assets/images/chat.svg";
import Inbox from "../inbox/Inbox";
import { Suspense, useState } from "react";
import { InboxListContext } from "../context/InboxListContext";
import { Await, defer, useLoaderData } from "react-router-dom";
import Loader from "../loader/Loader";

const Inboxes = () => {
  const { inboxes } = useLoaderData();
  const [inboxList, setInboxList] = useState(null);
  const [activeInbox, setActiveInbox] = useState(null);
  const [isInboxActive, setIsInboxActive] = useState(false);

  const selectInbox = (inboxid) => {
    setActiveInbox(inboxid);
    setIsInboxActive(true);
  };

  return (
    <Suspense fallback={<Loader />}>
      <Await
        resolve={inboxes}
        errorElement={<p>Error loading package location!</p>}
      >
        {(inboxes) => (
          <InboxListContext.Provider
            value={{ inboxList: inboxes, setInboxList }}
          >
            <div className={styles.inboxes}>
              <div className={styles.inboxList}>
                <h2 className={styles.inboxHeader}>Messages</h2>
                <InboxList
                  activeInbox={activeInbox}
                  selectInbox={selectInbox}
                />
              </div>
              {isInboxActive ? (
                <Inbox inboxid={activeInbox} />
              ) : (
                <ul className={styles.emptyInbox}>
                  <li>
                    <img
                      className={styles.chatIcon}
                      src={chatIcon}
                      alt=""
                    ></img>
                  </li>
                </ul>
              )}
            </div>
          </InboxListContext.Provider>
        )}
      </Await>
    </Suspense>
  );
};

export default Inboxes;

const InboxesLoader = async () => {
  const inboxes = fetch("http://localhost:3000/user/inboxes", {
    credentials: "include",
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.error) {
        throw new Error(res.error);
      }
      return res.inboxes;
    });

  return defer({ inboxes: inboxes });
};

export { InboxesLoader };
