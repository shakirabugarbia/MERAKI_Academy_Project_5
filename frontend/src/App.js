import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Register } from "./component/register";
import { Login } from "./component/login";

import NavBar from "./component/navbar";
import Homepage from "./component/homepage";
function App() {
  return (
    <div className="App">
      Welcome APP
      <NavBar />
      <Routes>
        <Route path={"/register"} element={<Register />} />
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/login"} element={<Login />} />
      </Routes>
    </div>
  );
}

export default App;
