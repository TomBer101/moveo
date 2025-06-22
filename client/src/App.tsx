import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import UnauthorizedPage from './pages/Unauthorized';
import './App.css'

// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <LoginPage />,
//   },
//   {
//     path: 'admin',
//     element:
//     <ProtectedRoute>
//       <AdminPage /> 
//     </ProtectedRoute>
//   },
//   {
//     path: 'user',
//     element:
//     <ProtectedRoute>
//       <UserPage />
//     </ProtectedRoute>
//   }
// ]);

function App() {

  return (
    <Router>
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/admin' element={    
          <ProtectedRoute requiredRole='admin'>
            <AdminPage /> 
          </ProtectedRoute>
        } />
        <Route path='/user' element={
          <ProtectedRoute requiredRole='user'>
            <UserPage />
          </ProtectedRoute>
        } />
        <Route path='unauthorized' element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  )
}

export default App
