import { createContext } from "react";
import { UserValue } from "../types/types";

type User = null | UserValue | false;

type UserContextValue = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

const UserContext = createContext<UserContextValue>({
  user: null,
  setUser: () => {},
});

export { UserContext };
