import React, { useState, createContext, useEffect } from "react";

const AuthContext = createContext(null);

function AuthContextComponent(props) {
  const [loggedInUser, setLoggedInUser] = useState(null);

  // função para verificar e armazenar os dados do usuário logado no front.
  useEffect(() => {
    const storedUser = localStorage.getItem("loggedInUser");

    const parsedStoredUser = JSON.parse(storedUser || '""');

    if (parsedStoredUser.token) {
      setLoggedInUser(parsedStoredUser);
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
