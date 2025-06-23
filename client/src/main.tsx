import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import store from './app/store.ts'

import './index.css'
import App from './App.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'


createRoot(document.getElementById('root')!).render(
        <Provider store={store}>
        <AuthProvider>
            <App />
        </AuthProvider>
    </Provider>
)
