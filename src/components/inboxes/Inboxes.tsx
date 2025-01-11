import styles from "./Inboxes.module.css";
import InboxList from "../inboxList/InboxList";
import chatIcon from "../../assets/images/chat.svg";
import Inbox from "../inbox/Inbox";
import { useEffect, useState } from "react";
import { InboxListContext } from "../context/InboxListContext";
import { useNavigate } from "react-router-dom";

const Inboxes = () => {
  const navigate = useNavigate();
  const [inboxList, setInboxList] = useState(null);
  const [activeInbox, setActiveInbox] = useState(null);
  const [isInboxActive, setIsInboxActive] = useState(false);

  useEffect(() => {
    const fetchInboxes = async () => {
      try {
        const res = await fetch("http://localhost:3000/user/inboxes", {
          credentials: "include",
        });

        const resData = await res.json();

        if (resData.error) {
          console.log(resData.error);
        } else {
          const inboxes = resData.inboxes.length > 0 ? resData.inboxes : [];
          setInboxList(inboxes);
        }
      } catch (err) {
        navigate("/error");
        console.log(err);
      }
    };

    fetchInboxes();

    return setInboxList(null);
  }, []);

  const selectInbox = (inboxid) => {
    setActiveInbox(inboxid);
    setIsInboxActive(true);
  };

  return (
    <InboxListContext.Provider value={{ inboxList, setInboxList }}>
      <div className={styles.inboxes}>
        <div className={styles.inboxList}>
          <h2 className={styles.inboxHeader}>Messages</h2>
          <InboxList activeInbox={activeInbox} selectInbox={selectInbox} />
        </div>
        {isInboxActive ? (
          <Inbox inboxid={activeInbox} />
        ) : (
          <ul className={styles.emptyInbox}>
            <li>
              <img className={styles.chatIcon} src={chatIcon} alt=""></img>
            </li>
          </ul>
        )}
      </div>
    </InboxListContext.Provider>
  );
};

export default Inboxes;
