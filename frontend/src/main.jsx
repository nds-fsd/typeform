import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { UserProvider } from './context/UserProvider';
import { FormProvider } from './context/FormContext';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <FormProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </FormProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
