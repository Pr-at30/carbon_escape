import "./App.css";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import PageNotFound from "./pages/PageNotFound";
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import CodeRunner from "./pages/CodeRunner";

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
          
          <Route path="*"
            element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;
