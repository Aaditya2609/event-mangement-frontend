import './App.css';
import { Route, Routes } from 'react-router-dom';
import Nav from './componentes/Nav';
import LinksPage from './pages/LinksPage';
import EventPage from './pages/EventPage';
import VolunteerPage from './pages/VolunteerPage';

function App() {
  return (
    <div className="w-full text-center flex justify-between">
    <Nav />
    <div className='w-full'>
    <Routes>
      <Route path="/" element={<VolunteerPage />} />
      <Route path="/events" element={<EventPage />} />
      <Route path="/links" element={<LinksPage />} />
    </Routes>
    </div>
  </div>
  );
}

export default App;
