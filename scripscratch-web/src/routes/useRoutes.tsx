import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Main } from "../pages/Main";
import { Music } from "../pages/Music";
import { Admin } from "../pages/Admin";
import { Login } from "../pages/Login";

export const useRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/music" element={<Music />} />
      <Route index element={<Main />} />

      <Route element={<PrivateRoute />}>
        <Route path="/admin" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default useRoutes;
