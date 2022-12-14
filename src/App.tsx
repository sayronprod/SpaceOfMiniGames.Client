import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout ";
import NoPage from "./pages/NoPage";
import Games from "./pages/Games/Games";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import { Provider } from "react-redux";
import { setupStore } from "./store/store";
import Manage from "./components/manage/Manage";

const store = setupStore();
store.subscribe(() => {
  localStorage.setItem(
    "userToken",
    JSON.stringify(store.getState().userReducer.userToken)
  );
  localStorage.setItem(
    "userInfo",
    JSON.stringify(store.getState().userReducer.userInfo)
  );
});

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="Games" element={<Games />} />
            <Route path="Login" element={<Login />} />
            <Route path="Register" element={<Register />} />
            <Route path="Manage" element={<Manage />} />
          </Route>
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
