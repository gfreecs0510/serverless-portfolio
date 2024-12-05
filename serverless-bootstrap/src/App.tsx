import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/main/Header';
import { Footer } from './components/main/Footer';
import Me from './components/me/Me';
import { Portfolio } from './components/me/Portfolio';
import { CharacterReference } from './components/me/CharacterReference';
import { SearchProvider } from './context/SearchContext';

function App() {
  return (
    <SearchProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <header className="text-center">
            <Header />
          </header>
          <main
            className="flex-grow-1 d-flex flex-column align-items-center justify-content-center bg-white text-left"
            style={{
              color: 'black',
            }}
          >
            <Routes>
              <Route path="/" element={<Me />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route
                path="/character-reference"
                element={<CharacterReference />}
              />
              <Route path="*" element={<Me />} />
            </Routes>
          </main>
          <footer className="mt-auto">
            <Footer />
          </footer>
        </div>
      </Router>
    </SearchProvider>
  );
}

export default App;
