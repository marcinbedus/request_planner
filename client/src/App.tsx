import React from "react";
import { Route, Routes } from "react-router-dom";
import { AddRequest } from "./components/AddRequest";
import { EditRequest } from "./components/EditRequest";
import { Login } from "./components/Login";
import { LoginError } from "./components/Login/Login.components";
import { RequestDetails } from "./components/RequestDetails";
import { RequestsList } from "./components/RequestsList";
import { CustomModal } from "./components/shared/CustomModal";
import { CustomNav } from "./components/shared/CustomNav";
import { useUserContext } from "./store/user";
import { ProtectedRoutes } from "./utils/ProtectedRoutes";

const App = () => {
  const {
    state: { isAuthenticated },
  } = useUserContext();

  return (
    <>
      <CustomModal />
      {isAuthenticated ? <CustomNav /> : null}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="login/error" element={<LoginError />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/" element={<RequestsList />} />
          <Route path="/:id" element={<RequestDetails />} />
          <Route path="/add-request" element={<AddRequest />} />
          <Route path="/edit-request/:id" element={<EditRequest />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
