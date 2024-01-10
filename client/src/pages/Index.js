import React, { useEffect, useState } from 'react';
import ListingItem from '../components/ListingItem';
import axios from 'axios';
import Spinner from '../components/Spinner';

function Index() {

  const [listings, setListings] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isSearch, setIsSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState({
    search: ''
  })

  const { search } = searchTerm;

  useEffect(() => {
    const fetchListings = async() => {
      await axios.get('/cars/index')
      .then((response) => {
        setListings(response.data.cars)
      })

      setLoading(false)
    }

    fetchListings();
  }, [])

  const onChange = (e) => {
    setSearchTerm((prevState) => ({

      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    await axios.post('/cars/index/search', searchTerm)
    .then((response) => {
      setListings(response.data.cars)
      console.log(response.data.cars)
    })
    setSearchTerm({search: ""})
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
    {!loading && listings?.length > 0 && (
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
      
    )}
        </>
      }





    
    </>
  )
}

export default Index