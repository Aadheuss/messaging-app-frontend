import "./App.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContext } from "./components/context/userContext/UserContext";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkCurrentUser = () => {
      const currentUser = JSON.parse(window.localStorage.getItem("user"));

      if (currentUser) {
        setUser(currentUser);
      }
    };

    checkCurrentUser();
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
