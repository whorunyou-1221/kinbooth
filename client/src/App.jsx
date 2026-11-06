import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Home from './components/pages/Home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Collage from './components/pages/Collage';
import SavedPhoto from './components/pages/SavedPhoto';
import Capture from './components/pages/Capture';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/collage" element={<Collage />} />
        <Route path="/savedphoto" element={<SavedPhoto />} />
        <Route path="/capture" element={<Capture />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
