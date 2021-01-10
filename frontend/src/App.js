import { ApolloProvider } from "@apollo/client";
import { useState, useEffect } from "react";
import "./App.css";
import client from "./config/apollo";
import Auth from "./pages/auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getToken } from "./utils/token";

function App() {
  const [auth, setAuth] = useState();

  useEffect(() => {
    const token = getToken();
    if (token) setAuth(token);
    else setAuth(null);
  }, [setAuth]);

  return (
    <ApolloProvider client={client}>
      {!auth ? <Auth /> : <h1>{auth.name} is logged in!</h1>}
      <ToastContainer closeOnClick draggable />
    </ApolloProvider>
  );
}

export default App;
