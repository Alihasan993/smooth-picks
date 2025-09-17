import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Pages/App';
import { BrowserRouter as Router } from 'react-router-dom';
import './Pages/Auth/Auth.css';
import './Components/Loading/Loading.css'
import './Pages/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Components/Dashboard/bars.css';
import './Pages/Dashboard/dashboard.css';
import './Components/pagination/pagination.css'
import './Components/Dashboard/dashboardContent.css'
import './Components/website/navbar.css'
import './Pages/media.css';
import MenuContext from './context/MenuContext';
import WindowContext from './context/WindowContext';
import './Pages/website/website.css';

import "react-image-gallery/styles/css/image-gallery.css";
import CartContext from './context/CartContext';
import RequstContext from './context/RequstContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MenuContext>
     <WindowContext>
      <CartContext>
       <RequstContext>
        <Router>
         <App />
        </Router>
       </RequstContext>
      </CartContext> 
     </WindowContext>  
    </MenuContext>
  </React.StrictMode>
);

