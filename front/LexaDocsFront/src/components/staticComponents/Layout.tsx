import { Outlet } from 'react-router-dom'

import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

export function Layout() {

    return (
        <div className="flex flex-col h-screen">
            <Navbar />
            <div className="d-flex flex-row">
                <div className="w-64">
                    <Sidebar />
                </div>
                <main className="mt-3 ms-3">
                    <Outlet />
                </main>

            </div>
        </div>
    );
};

export default Layout