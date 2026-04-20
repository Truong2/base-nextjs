export const clearLocalStorage = () => {
  window.localStorage.removeItem("auth_token");
  window.localStorage.removeItem("access_token");
  window.localStorage.removeItem("persist:root");
};

export const publicEndpoints = ["/login", "/register"];
