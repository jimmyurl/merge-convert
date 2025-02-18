import { Routes, Route } from 'react-router-dom';
import PDFConverter from './components/PDFConverter';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<PDFConverter />} />
      </Routes>
    </div>
  );
}

export default App;