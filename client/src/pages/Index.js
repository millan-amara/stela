import React, { useState } from 'react';
import ListingItem from '../components/ListingItem';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';

function Index() {

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [term, setTerm] = useState('');
  const [searchTerm, setSearchTerm] = useState({
    search: '',
  })
  const [formData, setFormData] = useState({
    description: '',
    phone: ''
  })


  const { search } = searchTerm;
  const { description, phone } = formData;

  const onChange = (e) => {
    setSearchTerm((prevState) => ({

      [e.target.id]: e.target.value,
    }))
  }

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
  }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
   
    await axios.post('/cars/index/search', searchTerm)
    .then((response) => {
      setListings(response.data.cars)
    })
    setLoading(false)
    setTerm(search)
    setSearchTerm('')
    setIsSearch(true)
  }

  const handleRequest = async (e) => {
    e.preventDefault()
    setLoading(true)

    await axios.post('/requests/index', formData)
    setLoading(false)
    setFormData({
      description: '',
      phone: ''
    })
    toast.success('Request sent!')
  }


  if(loading) {
    return <Spinner />
  }

  return (
    <>
      <form className="search-bar w-full flex justify-around mx-auto py-5 px-2 md:w-3/4" onSubmit={onSubmit}>
        <input 
          type="search" 
          name="search" 
          id='search' 
          value={search}
          onChange={onChange}
          pattern=".*\S.*" 
          required 
          className='w-3/4 focus:ring-2 focus:outline-none appearance-none text-sm leading-6 text-slate-900 rounded-md rounded-r-none py-2 pl-2 ring-1 ring-slate-200 shadow-sm'
        />
        <button className="search-btn w-1/4 py-2 px-4 bg-slate-700 text-white bg-gradient-to-r from-green-500 to-green-900 hover:from-green-900 hover:to-green-500 rounded-md rounded-l-none">
          <span>Search</span>
        </button>
      </form>

      { isSearch &&
      <> 
        {listings?.length > 0 ? (
          <>
            <ul className="listingsList">
              {listings.map((listing) => (
                <ListingItem
                  key={listing.id} 
                  listing={listing}
                />
              ))}
            </ul>
          </>
        ) : 
      
        <>
          <p className='w-full md:w-3/4 px-2 mx-auto flex items-center pb-10'>
          <span>Sorry, No results found for</span>
          <span className='text-orange-600 text-3xl'>
            {term}!
          </span>
          </p>
          <div className='px-2 md:w-3/4 mx-auto'>
          <p className='pb-3'>
            <span>Describe what you're looking for and we'll get it!</span>
          </p>
          <form onSubmit={handleRequest}>
            <div className='mb-5'>
                <label htmlFor="description">Description</label>
                <input 
                    type="text" 
                    id='description'
                    value={description}
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={handleChange}
                    placeholder='Black mazda demio with leather seats'
                    required
                />
            </div>
            <div className='mb-5'>
                <label htmlFor="phone">Your Phone Number</label>
                <input 
                    type="text" 
                    id='phone'
                    value={phone}
                    className="mt-1 focus:ring-2 focus:outline-none appearance-none w-full text-sm leading-6 text-slate-900 rounded-md py-2 pl-2 ring-1 ring-slate-200 shadow-sm" 
                    onChange={handleChange}
                    placeholder='0712345678'
                    required
                />
            </div>
            <button className='flex bg-gradient-to-r from-green-600 to-green-800 text-white w-full py-2 rounded-md items-center justify-center'>Send</button>

          </form>
          </div>
        </>}
      </>
      }

    </>

  ) 
}

export default Index