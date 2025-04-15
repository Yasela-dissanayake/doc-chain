import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage";
import DocumentList from "./components/DocumentList";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/documents" element={<DocumentList />} />
      </Routes>
    </Router>
  );
}

export default App;
