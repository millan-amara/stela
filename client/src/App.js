import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import Index from './pages/Index';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import Listing from './pages/Listing';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cars' element={<Index />} />
          <Route path='/profile' element={<PrivateRoute />} >
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/create-listing' element={<AdminRoute />} >
            <Route path='/create-listing' element={<CreateListing />} />
          </Route>
          <Route path='/edit-listing/:listingId' element={<AdminRoute />} >
            <Route path='/edit-listing/:listingId' element={<EditListing />} />
          </Route>
          <Route path='/sign-up' element={<AdminRoute />} >
            <Route path='/sign-up' element={<SignUp />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/cars/car/:listingId' element={<Listing />} />

        </Routes>
        <Navbar />
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;