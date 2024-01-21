import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';
import Index from './pages/Index';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import CarAdminDashboard from './pages/CarAdminDashboard';
import VerificationDashboard from './pages/VerificationDashboard';
import CreateListing from './pages/CreateListing';
import EditListing from './pages/EditListing';
import Listing from './pages/Listing';
import VerifyProfile from './pages/VerifyProfile';


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
          <Route path='/profile/dashboard/cars' element={<PrivateRoute />} >
            <Route path='/profile/dashboard/cars' element={<CarAdminDashboard />} />
          </Route>
          <Route path='/profile/dashboard/verifications' element={<PrivateRoute />} >
            <Route path='/profile/dashboard/verifications' element={<VerificationDashboard />} />
          </Route>
          <Route path='/create-listing' element={<PrivateRoute />} >
            <Route path='/create-listing' element={<CreateListing />} />
          </Route>
          <Route path='/edit-listing/:listingId' element={<PrivateRoute />} >
            <Route path='/edit-listing/:listingId' element={<EditListing />} />
          </Route>
          <Route path='/verify-profile' element={<PrivateRoute />} >
            <Route path='/verify-profile' element={<VerifyProfile />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/cars/car/:listingId' element={<Listing />} />

        </Routes>
        <Navbar />
      </Router>

      <ToastContainer />
    </>
  );
}

export default App;