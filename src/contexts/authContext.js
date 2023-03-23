import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext({ token: "", user: {} });

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState({ token: "", user: {} });

  // função para verificar e armazenar os dados do usuário logado no front.
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    const parsedStoredUser = JSON.parse(storedUser || '""');

    if (parsedStoredUser.user) {
      setLoggedInUser({ ...parsedStoredUser });
    } else {
      setLoggedInUser(null);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthContextComponent, AuthContext };
