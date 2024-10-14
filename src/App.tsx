import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ApplyPage from "./pages/ApplyPage";
import NotFoundPage from "./pages/NotFoundPage";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <main>
        <div className="max-w-screen-xl mx-auto w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/apply" element={<ApplyPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        </div>
      </main>
    </Router>
  );
};

export default App;
