import React from 'react';
import { Link } from 'react-router-dom';
import hondaImage from '../assets/jpg/honda.jpg';
import camryImage from '../assets/jpg/camry.jpg';
import logoImage from '../assets/jpg/stelaa.png';

function Home() {

  return (
    <div className='explore'>
    <header>
      <div className='flex justify-start'>
      <div 
        className="flex flex-col"
        style={{
          background: `url(${logoImage})
          center no-repeat`,
          backgroundSize: 'cover',
        }}
      >
                <p class="text-sm italic text-green-400 font-black pl-2">Magari</p>
                <p class="text-5xl italic text-green-400 font-black str">Stela</p>
            </div>
      </div>

          
       
    </header>
    <main>

      <p className='exploreCategoryHeading'>What you looking for?</p>
      <div className='exploreCategories'>
        <Link to="">
          <img 
            src={hondaImage}
            alt='honda accord'
            className='exploreCategoryImg'
          />
          <p className="exploreCategoryName">Honda Accord</p> 
        </Link>
        <Link to="">
          <img 
            src={camryImage}
            alt='toyota camry'
            className='exploreCategoryImg'
          />
          <p className="exploreCategoryName">Toyota Camry</p>
        </Link>
      </div>

    </main>
    
    </div>
  )
}

export default Home