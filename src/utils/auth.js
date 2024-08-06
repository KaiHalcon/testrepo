export const login = (username, password) => {
  if (username === "admin" && password === "123") {
    sessionStorage.setItem("isLoggedIn", "true");
    return true;
    /// authentication
  } else {
    return false;
  }
};

const logout = () => {
  sessionStorage.removeItem("isLoggedIn");
  return false;
};

const isLoggedIn = () => {
  //should return sessionstorage  isLoggedIn true
  return sessionStorage.getItem("isLoggedIn") === true;
};

export { logout, isLoggedIn };
