import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import Appointment from './pages/Appointment';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/appointment" element={<Appointment />} />
            </Routes>
        </Router>
    );
};

export default App;