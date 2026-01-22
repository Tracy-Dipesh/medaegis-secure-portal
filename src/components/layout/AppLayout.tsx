import { Outlet } from "react-router-dom";
import { AppSidebar } from "./AppSidebar";

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      <AppSidebar />
      <main className="flex-1 overflow-auto">
        <div className="container py-6 px-6 md:px-8 max-w-7xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
