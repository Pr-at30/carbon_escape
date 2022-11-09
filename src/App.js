import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import CarbonEmission from "./pages/CarbonEmission";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CodeRunner from "./pages/CodeRunner";
import Aboutus from "./pages/Aboutus";

function App() {
  return (
    <>
      <Router>
        <NavBar />

        <Routes>
          <Route path="/"
            element={<Home />} />

          <Route path="/coderunner"
            element={<CodeRunner />} />

          <Route path="/carbonemission"
            element={<CarbonEmission />} />
          
          <Route path="/aboutus"
            element={<Aboutus />} />
          
          <Route path="*"
            element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
