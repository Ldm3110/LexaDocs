import { Outlet } from "react-router-dom";

import Navbar from "./Navbar";
import StaffSidebar from "./StaffSidebar";
// import { useAuth } from '../../hooks/useAuth';
import AdminSidebar from "./AdminSidebar";
import CustomerSidebar from "./CustomerSidebar";
import { createContext } from "react";
import { useAuthStore } from "../../hooks/useAuth";

const ThemeContext = createContext(null);

export function Layout() {
  // const { role } = useAuth()
  const role = useAuthStore((state) => state.user.role);

  return (
    <ThemeContext.Provider value={role}>
      <div className="flex flex-col h-screen">
        <Navbar />
        <div className="flex flex-row">
          <div className="w-64">
            {role === "staff" ? (
              <StaffSidebar />
            ) : role === "customer" ? (
              <CustomerSidebar />
            ) : (
              <AdminSidebar />
            )}
          </div>
          <main className="mt-3 ml-3 flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}

export default Layout;
