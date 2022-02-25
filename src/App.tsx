import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/login';
import DashboardPage from './pages/dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
