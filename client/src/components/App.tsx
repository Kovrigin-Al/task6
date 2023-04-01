import { useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { socket } from "../socket";
import Chat from "./Chat";
import Login from "./Login";

function App() {
    const [userName, setUserName] = useLocalStorage("userName");

    const logout = () => {
        setUserName("");
        socket.disconnect();
    };

    return userName ? (
        <Chat userName={userName} logout={logout} />
    ) : (
        <Login onNameSumbit={setUserName} />
    );
}

export default App;
