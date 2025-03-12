import { Route, Routes} from "react-router-dom";
import {Button} from "./components/ui/Button";
function App() {
    return(
        <Routes>
            <Route path="/auth" element={<AuthPage/>}/>
        </Routes>
    )
}
export default App
