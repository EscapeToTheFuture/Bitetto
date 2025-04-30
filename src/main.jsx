import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@assets/style/index.css";

import Bitetto from './Bitetto';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Bitetto />
  </StrictMode>,
)
