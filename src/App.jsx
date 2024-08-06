import "./App.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserContext } from "./components/context/UserContext";

function App() {
  const [user, setUser] = useState(null);

  console.log({ user_app: user });
  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = JSON.parse(window.localStorage.getItem("user"));
      const isDataFetched = user
        ? Object.getOwnPropertyNames(user).length > 1
          ? true
          : false
        : false;

      if (currentUser) {
        if (!isDataFetched) {
          try {
            const id = currentUser._id;

            const res = await fetch(`http://localhost:3000/user/${id}`, {
              credentials: "include",
            });

            const resData = await res.json();

            if (resData.error) {
              if (resData.error.status >= 400 && resData.error.status < 500) {
                window.localStorage.removeItem("user");
                setUser(null);
              }
            } else {
              setUser(resData.data.user);
            }
          } catch (err) {
            console.log("Server Error");
          }
        }
      }
    };

    fetchUser();
  }, [user]);

  return (
    <>
      <UserContext.Provider value={{ user, setUser }}>
        <Outlet />
      </UserContext.Provider>
    </>
  );
}

export default App;
