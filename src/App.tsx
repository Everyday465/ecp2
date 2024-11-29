import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import Chimedemo from './pages/chimedemo';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/chimedemo" element={<Chimedemo />} />
            </Routes>
        </Router>
    );
};

export default App;
