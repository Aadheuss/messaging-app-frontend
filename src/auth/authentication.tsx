const isLoggedIn = async () => {
  const login = await fetch("http://localhost:3000/login", {
    mode: "cors",
    method: "get",
    credentials: "include",
  });

  if (login.status >= 400) return false;

  const loginData = await login.json();
  return loginData.user;
};

const logout = async ({ e, fn }) => {
  try {
    const logout = await fetch("http://localhost:3000/logout", {
      mode: "cors",
      credentials: "include",
    });

    const logoutData = await logout.json();

    if (logoutData.error) {
      console.error(logoutData.error);
    } else {
      fn();
    }
  } catch (err) {
    console.log(`AUTH:LOGOUT ERROR`);
    if (err instanceof Error) console.error(err.message);
  }
};

export { isLoggedIn, logout };
