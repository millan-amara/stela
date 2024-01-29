import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import arrowRight from '../assets/svg/keyboardArrowRightIcon.svg';
import carIcon from '../assets/svg/carIcon.svg';
import axios from 'axios';
import ProfileListingItem from '../components/ProfileListingItem';


function Profile() {
  const [changeDetails, setChangeDetails] = useState(false);
  const [user, setUser] = useState('');
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState(null);
  const [allCars, setAllCars] = useState(null);
  const [formData, setFormData] = useState({
    sName: '',
    email: '',
    phone: '',
  });

  const {sName, email, phone} = formData;
  
useEffect(() => {
  try{
    axios.get('/logged-in')
    .then((response) => {
        setUser(response.data)
        setFormData(response.data)
    })
    .catch((error) => {
        console.log(error)
    })
  } catch (error) {
    toast.error("Couldn't get User")
  }
}, [])

useEffect(() => {
  const fetchUserCars = async () => {
    await axios.get('/fetchusercars')
    .then((response) => {
      setListings(response.data)
    })

    setLoading(false);
  }

  fetchUserCars();
}, [user._id])



useEffect(() => {
  const fetchAllCars = async () => {
    try {
      await axios.get('/fetchallcars')
      .then((response) => {
      setAllCars(response.data)
    })
    } catch (error) {
      console.log(error)
    }
    setLoading(false);
  }

  fetchAllCars();
}, [user._id])


  const navigate = useNavigate();

  const onLogout = () => {
    axios.get('/logout')
    navigate('/sign-in')
  }

  const onSubmit = async () => {
    axios.put(`/users/${user._id}`, formData)
    toast.success("successfully updated!")
  }

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onDelete = async (listingId) => {
    if(window.confirm('Are you sure you want to delete?')) {
      axios.delete(`/cars/${listingId}`)
      const updatedListings = listings.filter((listing) => listing._id !== listingId)
      setListings(updatedListings)
      toast.success('Successfully deleted listing')
    }
  }

  const onEdit = (listingId) => {
    navigate(`/edit-listing/${listingId}`)
  }


  return (
    <div className='profile'>
      <header className='profileHeader'>
        <p className='pageHeader'>
          My Profile 
        </p>
        
        <button className='logOut' type='button' onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
      <div className="profileDetailsHeader">
          <p className="profileDetailsText">Personal Details</p>
          <p 
            className="changePersonalDetails" 
            onClick={() => {
              changeDetails && onSubmit()
              setChangeDetails((prevState) => !prevState)
            }}>
            {changeDetails ? 'done' : 'change'}
          </p>
        </div>

        <div className="profileCard">
          <form onSubmit={onSubmit}>
            <input 
              type="text"
              id="sName"
              className={!changeDetails ? 'profileName' : 'profileNameActive'}
              disabled={!changeDetails}
              value={sName}
              onChange={onChange}
            />
            <input 
              type="text" 
              id="email"
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={email}
              onChange={onChange}
            />
            <input 
              type="text" 
              id="phone"
              className={!changeDetails ? 'profileEmail' : 'profileEmailActive'}
              disabled={!changeDetails}
              value={phone}
              onChange={onChange}
            />
          </form>
        </div>

        <>
        <Link to='/create-listing' className='createListing'>
          <img src={carIcon} alt='home' style={{width: 40}}/>
          <p>Sell your car here</p>
          <img src={arrowRight} alt="arrow right" />
        </Link>

        {!loading && allCars?.length > 0 && (
          <>
            <p className="listingText">All Listings</p>
            
            <ul className=''>
              {allCars.map((listing) => (
                <ProfileListingItem
                  key={listing._id}
                  listing={listing}
                  id={listing._id}
                  onDelete={() => onDelete(listing._id)}
                  onEdit={() => onEdit(listing._id)}
                />
              ))}
            </ul>
          
          </>
        )}

        </>

      </main>
    </div>
  )

}

export default Profile