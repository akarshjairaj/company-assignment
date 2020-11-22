import { useState } from "react";
import "./App.css";

import Home from "./components/Home";
import Login from "./components/Login";
import Header from "./components/Header";

function App() {
  const [user, setUser] = useState({ loggedIn: false, token: "" });
  const [dateRange, setDateRange] = useState({
    "startDate": "1493337600000",
    "endDate": "1493510400000"
  });
  
  return (
    <div className="App">
      {user.loggedIn ? (
        <>
          <Header user={user} setDateRange={setDateRange} setUser={setUser} />
          <Home user={user} dateRange={dateRange}/>
        </>
      ) : (
        <Login setUser={setUser} />
      )}
    </div>
  );
}

export default App;
