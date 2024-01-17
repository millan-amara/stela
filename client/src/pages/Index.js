import React, { useState } from 'react';
import ListingItem from '../components/ListingItem';
import axios from 'axios';
import Spinner from '../components/Spinner';

function Index() {

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState({
    search: '',
  })
  const [term, setTerm] = useState('')

  const { search } = searchTerm;

  const onChange = (e) => {
    setSearchTerm((prevState) => ({

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


  if(loading) {
    return <Spinner />
  }

  return (
    <>
      { !isSearch ? 
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
        
        
        </> : 
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
      
    ) : <>
      <p className='w-full md:w-3/4 px-2 mx-auto flex items-center'>
        <span>Sorry, No results found for </span> 
        <span className='text-orange-600 text-3xl'>
          {term}!
        </span>
      </p>
    </>}




        </>
      }

    </>
  )
}

export default Index