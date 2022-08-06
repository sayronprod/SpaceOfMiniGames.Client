import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout ";
import NoPage from "./pages/NoPage";
import Games from "./pages/Games";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="Games" element={<Games />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
        </Route>
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
