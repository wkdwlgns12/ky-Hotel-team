import { useRoutes, BrowserRouter, Navigate } from "react-router-dom";
import { AdminAuthProvider } from "./context/AdminAuthContext";
import adminRoutes from "./router/adminRoutes";
import businessRoutes from "./router/businessRoutes";
import "./styles/index.scss";


const AppRoutes = () => {
  const element = useRoutes([
    { path: "/", element: <Navigate to="/auth/login" replace /> },
    ...adminRoutes,
    ...businessRoutes 
  ]);
  return element;
};

function App() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <AppRoutes />
      </AdminAuthProvider>
    </BrowserRouter>
  );
}

export default App;