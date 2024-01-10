import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as DeleteIcon } from '../assets/svg/deleteIcon.svg'
import { ReactComponent as EditIcon } from '../assets/svg/editIcon.svg'
import calendarIcon from '../assets/svg/calendarIcon.svg'
import Honda from '../assets/jpg/honda.jpg'


function ListingItem({ listing }) {
    
  return (
    <li className='categoryListing'> 
        <Link 
            to={`/cars/${listing._id}`}
            className='categoryListingLink'
        >
            <img
                src={listing.imgs[0].url}
                alt={listing.make}
                className='categoryListingImg'
            />

            <div className="categoryListingDetails">
                <p className="categoryListingLocation">
                    {listing.location}
                </p>
                <p className="categoryListingName">
                    {listing.make + ' ' + listing.model}
                </p>
                <p className="categoryListingPrice">
                    Ksh. {listing.price
                        .toString()
                        .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                </p>
                <div className="categoryListingInfoDiv">
                    <img src={calendarIcon} alt="car year" />
                    <p className="categoryListingInfoText">
                        {listing.year}
                    </p>
                </div>
            </div>
        </Link>
    </li>
  )

}

export default ListingItem