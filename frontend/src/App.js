import "./App.css";
import { Route, Routes } from "react-router-dom";
import {Register} from "./component/register";
import {Login} from "./component/login";

import NavBar from "./component/navbar";
function App() {
  return (
  <div className="App">Welcome APP
<NavBar/>
  <Routes>
  <Route path={"/"} element={<Register />} />
  <Route path={"/login"} element={<Login />} />



  </Routes>
  
  </div>);

}

export default App;
