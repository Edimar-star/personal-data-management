import HomePage from './pages/homePage'
import AddPersonPage from './pages/addPersonPage'
import EditPersonPage from './pages/editPersonPage'
import LogsPage from './pages/logsPage'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/add" element={<AddPersonPage />} />
        <Route path="/edit/:person_id" element={<EditPersonPage />} />
        <Route path="/logs" element={<LogsPage />} />
      </Routes>
    </BrowserRouter>
  );
}