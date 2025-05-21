import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import AppContextProvider from "./context/AppContext.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

const CLIENT_ID = "180129695892-g5shabf1spmrao596p3g7c4t1e58pdge.apps.googleusercontent.com";

createRoot(document.getElementById("root")).render(
    <BrowserRouter>
        <GoogleOAuthProvider clientId={CLIENT_ID} redirectUri="http://localhost:5175/login/oauth2/code/google">
            <AppContextProvider>
                <App />
            </AppContextProvider>
        </GoogleOAuthProvider>
    </BrowserRouter>
);
