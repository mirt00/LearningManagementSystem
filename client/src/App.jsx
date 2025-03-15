import { Route, Routes } from "react-router-dom";
import { Button } from "./components/ui/Button";
import Login from "@/pages/auth/Login";
import AuthPage from "@/pages/auth/index";

function App() {
  return (
    // my name
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/auth" element={<AuthPage />} />
    </Routes>
  );
}
export default App;
