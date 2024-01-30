import React from 'react';
import hondaImage from '../assets/jpg/honda.jpg';
import camryImage from '../assets/jpg/camry.jpg';

function Home() {

  return (
    <div className='explore'>
    <header>
          <p className='pageHeader'>MAGARI</p>
       
    </header>
    <main>

      <p className='exploreCategoryHeading'>What you looking for?</p>
      <div className='exploreCategories'>
        <div className='imageOne'>
          <img 
            src={hondaImage}
            alt='honda accord'
            className='exploreCategoryImg'
          />
          <p className="exploreCategoryName">Honda Accord</p> 
        </div>
        <div className='imageTwo'>
          <img 
            src={camryImage}
            alt='toyota camry'
            className='exploreCategoryImg'
          />
          <p className="exploreCategoryName">Toyota Camry</p>
        </div>
      </div>

    </main>
    
    </div>
  )
}

export default Home