import { Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./PrivateRoute";
import { Main } from "../pages/Main";
import { Music } from "../pages/Music";

export const useRoutes = () => {
  return (
    <Routes>
      {/* <Route path="/login" element={<Login />} /> */}
      <Route path="/music" element={<Music />} />
      <Route index element={<Main />} />

      <Route element={<PrivateRoute />}></Route>
    </Routes>
  );
};

export default useRoutes;
