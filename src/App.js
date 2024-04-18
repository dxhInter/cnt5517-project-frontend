// import logo from './logo.svg';
import Navbar from './Component/Navbar';
import Home from './Component/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Create from './Component/Create';
import ApplicationDetails from './Component/ApplicationDetails'; 

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<Create />} />
            <Route path="/apps/update/:id" element={<ApplicationDetails />} /> 
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
