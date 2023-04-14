import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { theme } from './styles/theme';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Inscricao } from './components/Inscricao';
import { PaymentApproved } from './components/PaymentApproved';
import { ConfigProvider } from 'antd';
import { Admin } from './components/admin';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ConfigProvider direction="rtl">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/inscricao" element={<Inscricao />} />
            <Route path="/aprovado" element={<PaymentApproved />} />
            <Route path="/painel" element={<Admin />} />
          </Routes>
        </BrowserRouter>
      </ConfigProvider>
    </ChakraProvider>
  </React.StrictMode>
);
