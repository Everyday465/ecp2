import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Homepage from './pages/homepage';
import Chimedemo from './pages/chimedemo';
import UploadPage from './pages/uploadfile';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/chimedemo" element={<Chimedemo />} />
                <Route path="/upload" element={<UploadPage />} /> {/* Add route for upload page */}

            </Routes>
        </Router>
    );
};

export default App;
