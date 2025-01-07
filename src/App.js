import react from "react";
import { BrowserRouter } from "react-router-dom";
import WebRoutes from "./routes/WebRoutes";

function App() {
  return (
    <BrowserRouter>
        <WebRoutes />
    </BrowserRouter>
  );
}

export default App;
