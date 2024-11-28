import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/main/Header';
import { Footer } from './components/main/Footer';
import Me from './components/me/Me';
import { Portfolio } from './components/me/Portfolio';
import { CharacterReference } from './components/me/CharacterReference';

function App() {
  return (
    <Router>
      <div className="text-center">
        <Header />
      </div>
      <div
        className="App d-flex flex-column align-items-center justify-content-center text-left bg-white"
        style={{
          minHeight: '70vh',
          color: 'black',
        }}
      >
        <Routes>
          <Route path="/" element={<Me />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/character-reference" element={<CharacterReference />} />
          <Route path="*" element={<Me />} />
        </Routes>
      </div>
      <div className="footer">
        <Footer />
      </div>
    </Router>
  );
}

export default App;
