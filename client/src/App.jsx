import { Route, Routes} from "react-router-dom";
import {Button} from "./components/ui/Button";
import AuthPage from "./pages/auth";

function App() {
    return(
// my name 
        <Routes>
            <Route path="/auth" element={<AuthPage/>}/>
        </Routes>
    )
}
export default App
