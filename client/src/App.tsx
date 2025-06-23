import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

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
        <Route path='/'  element={<Navigate to='/admin' replace />} />
        <Route path='/admin' element={    
            <AdminPage /> 
        } />
        <Route path='/user' element={
            <UserPage />
        } />
        <Route path='unauthorized' element={<UnauthorizedPage />} />
      </Routes>
    </Router>
  )
}

export default App
