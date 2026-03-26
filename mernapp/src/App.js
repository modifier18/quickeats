import './App.css';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './screens/Home.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from './screens/Login.js';
import SignUp from './screens/SignUp.js';
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder.js';
import { ToastContainer } from "react-toastify";
import { ToggleProvider } from './contexts/ToogleContext.js'; 
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <CartProvider>
      <ToggleProvider>
        <Router>
          <Routes>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/signup' element={<SignUp />} />
            <Route exact path='/myOrder' element={<MyOrder />} />
          </Routes>
          {/* Toast container should always be mounted */}
          <ToastContainer 
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Router>
      </ToggleProvider>
    </CartProvider>
  );
}

export default App;
