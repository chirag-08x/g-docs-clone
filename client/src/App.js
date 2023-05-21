import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Documents, SingleDocument } from "./app/pages";
import ProtectedRoute from "./app/routes/ProtectedRoute";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="h-screen grid place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="300"
          height="200"
          viewBox="0 0 300 200"
        >
          <circle cx="50" cy="100" r="20" fill="#4285F4">
            <animate
              attributeName="cy"
              values="100;80;100;100"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="100" cy="100" r="20" fill="#EA4335">
            <animate
              attributeName="cy"
              values="100;120;100;100"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="150" cy="100" r="20" fill="#FBBC05">
            <animate
              attributeName="cy"
              values="100;80;100;100"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="200" cy="100" r="20" fill="#34A853">
            <animate
              attributeName="cy"
              values="100;120;100;100"
              dur="0.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/document"
          element={
            <ProtectedRoute>
              <Documents />
            </ProtectedRoute>
          }
        />
        <Route
          path="/document/:id"
          element={
            <ProtectedRoute>
              <SingleDocument />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
