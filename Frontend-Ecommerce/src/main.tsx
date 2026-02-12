import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './context/CartContext.tsx';
import ScrollToTop from './utils/ScrollToTop.tsx';
import "./styles/global.css";
import "./styles/tailwind.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
        <CartProvider>
          <App />
      </CartProvider>
    </BrowserRouter>
  </StrictMode>,
)
