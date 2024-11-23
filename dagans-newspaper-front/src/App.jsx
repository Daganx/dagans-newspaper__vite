import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import Login from "./pages/Login";
import Dashboard from "./pages/dashboard";
import IndexPage from "./pages/index";
import ArticleDetail from "./components/articles/articleDetail/ArticleDetail";
import Navigation from "./components/navigation/Navigation";
import Footer from "./components/footer/Footer";

export default function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="/article/:id" element={<ArticleDetail />} />
      </Routes>
      <Footer />
    </Router>
  );
}
