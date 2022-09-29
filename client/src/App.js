import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import axios from "axios";
import AuthContext from "./utilities/authContext";

import Header from "./pages/Header";
import Main from "./pages/Main";
import Footer from "./pages/Footer";
import "./sass/main.scss";

function App() {
  const isUserLoggedIn = () => {
    if (localStorage.getItem("userData") && localStorage.getItem("accessToken"))
      return true;
    else return false;
  };
  const [isAuth, setAuth] = useState(isUserLoggedIn());

  // app name
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_PROXY}/api/app/title`)
      .then((response) => {
        document.title = response.data.title;
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleAuth = () => setAuth(!isAuth);
  return (
    <AuthContext.Provider value={{ isAuth: isAuth, handleAuth: handleAuth }}>
      <BrowserRouter>
        <Header />
        <Main />
        <Footer />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
