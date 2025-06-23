import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import UserPage from './pages/UserPage';
import UnauthorizedPage from './pages/Unauthorized';
import { useAppDispatch } from './app/hooks';
import { fetchTags } from './features/tags/tagsSlice';
import { useEffect } from 'react';
import './App.css'
import { fetchTasks } from './features/tasks/tasksSlice';


function App() {
  const dispatch = useAppDispatch();


  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchTasks());
  }, [dispatch]);

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
