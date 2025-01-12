import { createContext } from "react";

const InboxListContext = createContext({
  inboxList: null,
  setInboxList: () => {},
});

export { InboxListContext };
