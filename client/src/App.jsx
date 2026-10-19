import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import TopNav from './components/TopNav';
import Home from './components/pages/Home';
import { BrowserRouter, Routes,Route} from 'react-router-dom';
import Collage from './components/pages/collage';
import SavedPhoto from './components/pages/SavedPhoto';


function App() {

  return (
    <>
    {/* Top Navigation */}
    
     <BrowserRouter>
     <TopNav/>
        <Routes>
            <Route path="/" element = {<Home/>} /> 
            <Route path="/collage" element={<Collage/>} />
            <Route path="/savedphoto" element={<SavedPhoto/>} />
        </Routes>
     </BrowserRouter>
      
    </>
  )
}

export default App
