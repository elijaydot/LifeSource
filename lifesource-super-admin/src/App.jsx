import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import DashboardRoute from "./DashboardRoute";

function App() {
  return (
    <>
      <>
        <Routes>
          <Route path="/" element={<Signin />} />
          <Route path="/*" element={<DashboardRoute />} />
        </Routes>
      </>
    </>
  );
}

export default App;
