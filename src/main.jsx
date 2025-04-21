import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "@assets/style/index.css";

import Adelfia from './Adelfia';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Adelfia />
  </StrictMode>,
)
