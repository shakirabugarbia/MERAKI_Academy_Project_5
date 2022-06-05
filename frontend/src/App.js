import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Register } from "./component/register";
import { Login } from "./component/login";

import NavBar from "./component/navbar";
import Homepage from "./component/homepage";
import Basket from "./component/basket";
import SearchResult from "./component/searchResult";

function App() {
  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route path={"/register"} element={<Register />} />
        <Route path={"/"} element={<Homepage />} />
        <Route path={"/login"} element={<Login />} />
        <Route path={"/search"} element={<SearchResult/>} />

        <Route path={"/basket"} element={<Basket />} />
    
      </Routes>
    </div>
  );
}

export default App;
