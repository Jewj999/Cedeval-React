import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/auth/login';
import SignupPage from './pages/auth/register/signup';
import SignupSuccessful from './pages/auth/register/signup-successful';
import DashboardPage from './pages/dashboard';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Navigate to="/login" />}></Route>
        <Route path="login" element={<LoginPage />} />
        <Route path="signup" element={<SignupPage />} />
        <Route path="signup/successful" element={<SignupSuccessful />} />
        <Route path="dashboard" element={<DashboardPage />} />
      </Routes>
    </div>
  );
}

export default App;
