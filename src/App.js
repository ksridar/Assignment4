import './App.css';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';

import Home from './components/Home/Home.jsx'

function App() {
  return (
    <Router>
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
          </Routes>
        </main>
    </Router>
  );
}

export default App;
