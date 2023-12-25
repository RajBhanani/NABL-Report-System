import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Logout from "./pages/Logout";
import PrivateRoute from "./components/PrivateRoute";
import SuperadminOnlyRoute from "./components/SuperadminOnlyRoute";
import Home from "./pages/Home/Home";
import Nabl from "./pages/NABL/Nabl";
import NABLData from "./pages/SuperAdmin/NABLData";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Login />} />

        {/* Allow only logged in users */}
        <Route path="" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/nabl/*" element={<Nabl />} />

          {/* Allow only logged in and superadmin users */}
          <Route path="" element={<SuperadminOnlyRoute />}>
            <Route path="/register" element={<Register />} />
            <Route path="/nablData/*" element={<NABLData />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
