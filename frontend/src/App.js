import { ApolloProvider } from "@apollo/client";
import { useState, useEffect, useMemo } from "react";
import "./App.css";
import client from "./config/apollo";
import Auth from "./pages/auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "./utils/token";
import AuthContext from "./context/AuthContext";
import Navigation from "./routes/Navigation";

function App() {
  const [auth, setAuth] = useState();
  //localStorage.removeItem("token");
  useEffect(() => {
    const token = getToken();
    if (token) setAuth(token);
    else setAuth(null);
  }, [setAuth]);

  const logout = () => {
    console.log("Logged out!");
  };

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
