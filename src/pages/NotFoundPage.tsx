import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFoundPage: React.FC = () => {
  return (
    <div>
      <h1 className="text-xl font-bold mb-8">404 - Page Not Found</h1>
      <p className="text-gray-600 mb-4">
        The page you are looking for does not exist.
      </p>

      <Button
        asChild
        className="rounded-full px-8 py-3 bg-black text-white hover:bg-gray-800"
      >
        <Link to="/">Go back to Home</Link>
      </Button>
    </div>
  );
};

export default NotFoundPage;
