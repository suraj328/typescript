import React from "react";
import CounterUseMemo from "./component/CounterUseMemo";
import LoginButton from "./component/AuthO/LoginButton";
import Profile from "./component/AuthO/Profile";

const App: React.FC = function () {
  return (
    <div className="App">
      <CounterUseMemo/>
      <h1>AuthO</h1>
      <Profile/>
    </div>
  );
};

export default App;
