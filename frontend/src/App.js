import { ApolloProvider } from "@apollo/client";
import { useState, useEffect, useMemo } from "react";
import { ToastContainer } from "react-toastify";
import {
  decodeToken,
  getToken,
  removeToken,
  verifyTokenExpiration,
} from "./utils/token";
import { appConfig } from "./config/config";
import AuthContext from "./context/AuthContext";
import Navigation from "./routes/Navigation";
import client from "./config/apollo";
import Auth from "./pages/auth/Auth";

import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [auth, setAuth] = useState();
  document.title = appConfig.name;

  const logout = () => {
    removeToken();
    setAuth(null);
  };

  useEffect(() => {
    const token = getToken();
    if (!verifyTokenExpiration(token)) logout();
    if (token) setAuth(decodeToken(token));
    else setAuth(null);
  }, [setAuth]);

  const setUserData = (userData) => {
    setAuth(userData);
  };

  const authData = useMemo(
    () => ({
      logout,
      auth,
      setUserData,
    }),
    [auth]
  );

  // Just to avoid the rendering of the login page when the user is actually logged in.
  // Comment this line and you'll see the login page for an instant when refreshing the page.
  if (auth === undefined) return null;

  return (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={authData}>
        {!auth ? <Auth /> : <Navigation />}
        <ToastContainer closeOnClick draggable />
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
