import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">404</h1>
        <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
        <p className="text-gray-500 mb-6">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <button className="bg-blue-500 hover:bg-blue-600" asChild>
          <a href="/">Return to Dashboard</a>
        </button>
      </div>
    </div>
  );
};

export default NotFound;
