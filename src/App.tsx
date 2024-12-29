import React from "react";
import { CssBaseline } from "@mui/material";
import UserDashboard from "./pages/UserDashboard";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
        <UserDashboard />
    </>
  );
};

export default App;
