import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes, Route, BrowserRouter } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import ChooseAuth from './pages/ChooseAuth'
import Auth from './pages/Auth';
import Clients from './pages/Clients';
import Cases from './pages/Cases';
import Dashboard from './pages/Dashboard';
import Layout from './components/staticComponents/Layout';

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ChooseAuth />} />
          <Route path='/auth/staff' element={<Auth type={'staff'} />} />
          <Route path='/auth/customers' element={<Auth type={'customers'} />} />
          <Route element={<Layout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/dossiers" element={<Cases />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)
