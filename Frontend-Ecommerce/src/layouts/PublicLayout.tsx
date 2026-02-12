import React, { useState } from "react";
import Header from "../components/shared/Header";
import Footer from "../components/shared/Footer";
import { Outlet, useLocation } from "react-router-dom";

const PublicLayout: React.FC = () => {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(false);
  const location = useLocation();

  const noPaddingRoutes = ["/", "/login", "/signup"];
  const shouldRemovePadding = noPaddingRoutes.includes(location.pathname);

  return (
    <div className="min-h-screen flex flex-col ">
      <main className="flex-1">
        {/* Header wrapper: full-bleed backgrounds stay here */}
        <div className="w-full">
          {/* content container: centers content and adds safe horizontal padding */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-16">
            <Header onCategoriesToggle={setIsCategoriesOpen} />
          </div>
        </div>

        {/* Page content container */}
        <div className={shouldRemovePadding ? '' : 'max-w-7xl mx-auto px-4 sm:px-6 md:px-16'}>
          <Outlet />
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;