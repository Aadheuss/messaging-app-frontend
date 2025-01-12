import "./App.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContext } from "./context/UserContext";
import { UserValue } from "./types/types";
import { isLoggedIn } from "./auth/authentication";

function App() {
  const [user, setUser] = useState<null | UserValue | false>(null);

  useEffect(() => {
    const configureUserState = async () => {
      // Check if the user is authenticated
      const user = await isLoggedIn();

      setUser(user);
    };

    configureUserState();
  }, []);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Outlet />
      </UserContext.Provider>
    </>
  );
}

export default App;
