import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/article" />}
        />
        <Route
          path="/article"
          element={<Dashboard />}
        />
      </Routes>
    </Router>
  );
}

export default App;
