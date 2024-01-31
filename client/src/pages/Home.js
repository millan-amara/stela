import React from 'react';
import { Link } from 'react-router-dom';
import hondaImage from '../assets/jpg/honda.jpg';
import camryImage from '../assets/jpg/camry.jpg';

function Home() {

  return (
    <div className='explore'>
    <header>
      <div className='flex justify-start'>
      <div class="flex flex-col items-center">
                <p class="text-sm font-extrabold">Magari</p>
                <p class="text-5xl italic text-green-400 font-extrabold">Stela</p>
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