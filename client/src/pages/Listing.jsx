import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import shareIcon from '../assets/svg/shareIcon.svg';
import { FaWhatsapp } from "react-icons/fa";
import axios from 'axios';

import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css/bundle'
import 'swiper/css';
import 'swiper/css/navigation'; 
import 'swiper/css/pagination';
import 'swiper/css/scrollbar'; 


function Listing() {
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(true);
    const [date, setDate] = useState('');
    const [sharedLinkCopied, setSharedLinkCopied] = useState(false);

    const params = useParams();

    useEffect(() => {
        const fetchListing = async() => {
          await axios.get(`/cars/${params.listingId}`) 
          .then((response) => {
            setListing(response.data.car);
            setDate(response.data.formattedDate);
          })
          setLoading(false);
        }

        fetchListing()
    }, [params.listingId])
 

  if(loading) {
      return <Spinner />
  }

  return ( 
    <>
    <main className='showMain'>
    <Swiper 
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            pagination={{clickable: true}}
        >
            {listing.imgs.map((url, index) => (
                <SwiperSlide key={index}>
                    <div 
                        style={{
                            background: `url(${listing.imgs[index].url})
                            center no-repeat`,
                            backgroundSize: 'cover',
                        }} 
                        className="swiperSlideDiv"
                    >
                        <img src={url.url} className="swiperSlideImg" alt="car" />
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>

        <div
            className="shareIconDiv"
            onClick={() => {
                navigator.clipboard.writeText(window.location.href)
                setSharedLinkCopied(true)
                setTimeout(() => {
                    setSharedLinkCopied(false)
                }, 2000)
            }}>
            <img src={shareIcon} alt="share icon" />
        </div>

        {sharedLinkCopied && <p className='linkCopied'>Link Copied!</p> }
    
        <div className="listingDetails">
            <div className="listingName">
                {listing.make + ' ' + listing.model} - Ksh.
                {' ' + listing.price.toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',') 
                }
            </div>
            <div className='listingType'>
                {date}
            </div>
        </div>

    <div className="table-wrapper">
        <table className="fl-table">
        <thead>
        <tr>
            <th>Car</th>
            <th>Details</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>Mileage</td>
            <td>{listing.mileage} km</td>
        </tr>
        <tr>
            <td>Body Type</td>
            <td>{listing.bodyType}</td>
        </tr>
        <tr>
            <td>Year</td>
            <td>{listing.year}</td>
        </tr>
        <tr>
            <td>Fuel Type</td>
            <td>{listing.fuel}</td>
        </tr>
        <tr>
            <td>Engine Capacity</td>
            <td>{listing.engineSize} cc</td>
        </tr>
        <tr>
            <td>Interior</td>
            <td>{listing.interiorType}</td>
        </tr>
        <tr>
            <td>Transmission</td>
            <td>{listing.transmission}</td>
        </tr>
        <tr>
            <td>Car Condition</td>
            <td>{listing.condition}</td>
        </tr>
        <tr>
            <td>Location</td>
            <td>{listing.location}</td>
        </tr>
        </tbody>
        </table>

        <div className='md:w-1/2 md:flex md:justify-center mx-auto'>
            <a href={`https://wa.me/+254700487751?text= Hi,%20I'm%20interested%20in%20the%20${listing.year}%20${listing.make}%20${listing.model},%20listed%20on%20magaristela.com%20${window.location.href}`} className='text-white px-3 py-3 rounded-t-md rounded-b-none flex items-center justify-center' id='whatsapp'>
                <FaWhatsapp /> <span> Chat on WhatsApp</span>
            </a>
        </div>
    </div>
 

    <div id='video' className='mt-5'>
        <iframe id='youtube' src="https://www.youtube.com/embed/FsnIY74ZcjM" title={params.listingId}/>
    </div>

  
    </main>
    </>
  )

}
 
export default Listing