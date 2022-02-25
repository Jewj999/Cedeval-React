import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="login" element={LoginPage} />
        <Route path="dashboard" />
      </Routes>
    </div>
  );
}

export default App;
