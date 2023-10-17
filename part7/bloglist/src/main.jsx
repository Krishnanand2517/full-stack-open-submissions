import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { NotificationContextProvider } from './NotificationContext';
import { UserContextProvider } from './UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';
import './index.css';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <Router>
        <QueryClientProvider client={queryClient}>
            <NotificationContextProvider>
                <UserContextProvider>
                    <App />
                </UserContextProvider>
            </NotificationContextProvider>
        </QueryClientProvider>
    </Router>
);