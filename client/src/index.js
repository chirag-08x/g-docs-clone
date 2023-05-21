import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { ProtectedRoute } from "./app/routes/ProtectedRoute";

const Index = () => {
  return (
    <Auth0Provider
      domain="dev-vvy2866e.us.auth0.com"
      clientId="rmcWG9sLuesAUIRxkfU795HA2MPaLp1F"
      authorizationParams={{
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Index />);
