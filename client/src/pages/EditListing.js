import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';
import { toast } from 'react-toastify';
import Compressor from 'compressorjs';
import axios from 'axios';
import ImageEdit from '../components/ImageEdit';

function EditListing() {
  // eslint-disable-next-line
    const [selectedImages, setSelectedImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
      make: '',
      model: '',
      year: '', 
      mileage: '',
      images: [],
      price: '',
      location: '',
      transmission: '',
      condition: '',
      bodyType: '',
      color: '', 
      fuel: '',
      engineSize: '',
      interiorType: '',
      deleteImages: [],
      userRef: '',
      phoneNumber: '',
      yardName: '',
      videoLink: '',
    })
  
    const {make,model,year,mileage,price,location,images,transmission,condition,bodyType,color,fuel,engineSize,interiorType, deleteImages,phoneNumber,yardName,videoLink} = formData

    const navigate = useNavigate()
    const isMounted = useRef(true)
    const params = useParams()

    // also sets userRef to logged in user
    useEffect(() => {
      const isLoggedIn = async () => {
        await axios.get('/logged-in')
        .then((response) => {
          setFormData({...formData, userRef: response.data._id})
        })
      }

      isLoggedIn();

        return () => {
            isMounted.current = false
        }

      //  eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted])


    //fetch listing to edit

    useEffect(() => {
      setLoading(true)
      const fetchListing = async () => {
        await axios.get(`/cars/${params.listingId}`)
        .then((response) => {
          if(response.data.car !== null) {
            setFormData({
              ...response.data.car,
              images: [],
              deleteImages: []
            })

            setSelectedImages(response.data.car.imgs)
            setLoading(false)
          } else {
            navigate('/')
            toast.error('Listing does not exist')
          }
        })
      }

      fetchListing()
    }, [params.listingId, navigate])


    const onSubmit = async (e) => {
      e.preventDefault()
      setLoading(true)

      if(images.length > 6) {
          setLoading(false)
          toast.error('Max 6 images')
      }

      const requestBody = new FormData();
      delete formData.imgs
   
      for (const key in formData) {
        requestBody.append(key, formData[key])
      }

      images.forEach((image) => {
        requestBody.append('files', image);
      })
      deleteImages.forEach((image) => {
        requestBody.append('deleted', (`${image.filename}`));
      })

      for (var key of requestBody.entries()) {
        console.log(key[0] + ', ' + key[1])
      }
  
     axios.put(`/cars/${params.listingId}`, requestBody)
     .then((response) => {
      if(response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success('Listing saved');
      }
     });
      setLoading(false);
      navigate(`/profile`);
    }


    const onMutate = (e) => {
      let boolean = null
      if (e.target.value === 'true') {
          boolean = true
        }
        if (e.target.value === 'false') {
          boolean = false
        }

      //Text/Booleans/Numbers
      if(!e.target.files) {
          setFormData((prevState) => ({
              ...prevState,
              [e.target.id]: boolean ?? e.target.value
          }))
      }
    }

    const onSelectFile = (event) => {
      const selectedFiles = event.target.files;
      const selectedFilesArray = Array.from(selectedFiles);
    
      const imagesArray = [...selectedFilesArray]

      selectedFilesArray.map((file) => (
        new Compressor(file, {
          quality: 0.6,
          success(result) {
            console.log(result)
            setFormData((prevState) => ({
              ...prevState,
              images: [...prevState.images, result]
            }))
          },
          error(err) {
            console.log(err.message)
          }
        })
      ))

      setSelectedImages((previousImages) => previousImages.concat(imagesArray));
      
      // FOR BUG IN CHROME
      event.target.value = "";
    };


    function deleteHandler(image) {
      setSelectedImages(selectedImages.filter((e) => e !== image));
      URL.revokeObjectURL(image);
      setFormData((prevState) => ({
        ...prevState,
        images: [...prevState.images.filter((e) => e !== image)]
      }))
    }

    function removeHandler(image) {
      setSelectedImages(selectedImages.filter((e) => e !== image));
      setFormData((prevState) => ({
        ...prevState,
        deleteImages: [...prevState.deleteImages, image]
      }))
      console.log(deleteImages)
    }


    if(loading) {
        return <Spinner />
    }

    return (
      <div className='profile'>
          <header>
              <p className="pageHeader">Edit a Listing</p>
          </header>

          <main>
              <form onSubmit={onSubmit}>
              <label className='formLabel'>Video Link</label>
              <input
                className='formInputName'
                type='text'
                id='videoLink'
                value={videoLink}
                onChange={onMutate}
              />
                <label className='formLabel'>Yard Name</label>
                <input
                  className='formInputName'
                  type='text'
                  id='yardName'
                  value={yardName}
                  onChange={onMutate}
                />
                <label className='formLabel'>Yard Phone Number</label>
                <input
                  className='formInputName'
                  type='text'
                  id='phoneNumber'
                  value={phoneNumber}
                  onChange={onMutate}
                />
                  <label htmlFor="interiorType" className="formLabel">Interior Type</label>
                  <div className="formButtons">
                      <button
                          type='button'
                          className={interiorType === 'leather' ? 'formButtonActive' : 'formButton'}
                          id='interiorType'
                          value='leather'
                          onClick={onMutate}
                      >
                          Leather
                      </button>
                      <button
                          type='button'
                          className={interiorType === 'cloth' ? 'formButtonActive' : 'formButton'}
                          id='interiorType'
                          value='cloth'
                          onClick={onMutate}
                      >
                          Cloth
                      </button>
                  </div>

        <label htmlFor='make' className='formLabel'>Make</label>
        <input
          className='formInputName'
          type='text'
          id='make'
          value={make}
          onChange={onMutate}
          required
        />
        <label htmlFor='model' className='formLabel'>Model</label>
        <input
          className='formInputName'
          type='text'
          id='model'
          value={model}
          onChange={onMutate}
          required
        />
        <label htmlFor='color' className='formLabel'>Color</label>
        <input
          className='formInputName'
          type='text'
          id='color'
          value={color}
          onChange={onMutate}
          required
        />
        <label htmlFor='bodyType' className='formLabel'>Body Type</label>
        <input
          className='formInputName'
          type='text'
          id='bodyType'
          value={bodyType}
          onChange={onMutate}
          placeholder='suv, sedan, hatchback, minivan'
          required
        />
        
        <label htmlFor='mileage' className='formLabel'>Mileage</label>
        <input
          className='formInputName'
          type='text'
          id='mileage'
          value={mileage}
          onChange={onMutate}
          required
        />

        <label htmlFor='year' className='formLabel'>Year</label>
        <input
          className='formInputName'
          type='text'
          id='year'
          value={year}
          onChange={onMutate}
          required
        />

        <label htmlFor='engineSize' className='formLabel'>Engine Size</label>
        <input
          className='formInputName'
          type='text'
          id='engineSize'
          value={engineSize}
          onChange={onMutate}
          required
        />

        <label htmlFor="fuel" className="formLabel">Fuel</label>
                  <div className="formButtons">
                      <button
                          type='button'
                          className={fuel === 'petrol' ? 'formButtonActive' : 'formButton'}
                          id='fuel'
                          value='petrol'
                          onClick={onMutate}
                      >
                          Petrol
                      </button>
                      <button
                          type='button'
                          className={fuel === 'diesel' ? 'formButtonActive' : 'formButton'}
                          id='fuel'
                          value='diesel'
                          onClick={onMutate}
                      >
                          Diesel
                      </button>
                  </div>

                  <label htmlFor="transmission" className="formLabel">Transmission</label>
                  <div className="formButtons">
                      <button
                          type='button'
                          className={transmission === 'automatic' ? 'formButtonActive' : 'formButton'}
                          id='transmission'
                          value='automatic'
                          onClick={onMutate}
                      >
                          Automatic
                      </button>
                      <button
                          type='button'
                          className={transmission === 'manual' ? 'formButtonActive' : 'formButton'}
                          id='transmission'
                          value='manual'
                          onClick={onMutate}
                      >
                          Manual
                      </button>
                  </div>

                  <label htmlFor="condition" className="formLabel">Condition</label>
                  <div className="formButtons">
                      <button
                          type='button'
                          className={condition === 'new' ? 'formButtonActive' : 'formButton'}
                          id='condition'
                          value='new'
                          onClick={onMutate}
                      >
                          Brand New
                      </button>
                      <button
                          type='button'
                          className={condition === 'foreign' ? 'formButtonActive' : 'formButton'}
                          id='condition'
                          value='foreign'
                          onClick={onMutate}
                      >
                          Foreign Used
                      </button>
                      <button
                          type='button'
                          className={condition === 'local' ? 'formButtonActive' : 'formButton'}
                          id='condition'
                          value='local'
                          onClick={onMutate}
                      >
                          Locally Used
                      </button>
                  </div>

        <label htmlFor='location' className='formLabel'>Location</label>
        <input
          className='formInputAddress'
          type='text'
          id='location'
          value={location}
          onChange={onMutate}
          required
        />

        <label htmlFor='price' className='formLabel'>Price</label>
        <div className='formPriceDiv'>
          <input
            className='formInputSmall'
            type='number'
            id='price'
            value={price}
            onChange={onMutate}
            min='50'
            max='750000000'
            required
          />
          {<p className='formPriceText'>Ksh </p>}
        </div>
        <ImageEdit
          onSelectFile={onSelectFile}
          selectedImages={selectedImages}
          deleteHandler={deleteHandler}
          removeHandler={removeHandler}
        />

        <p>By clicking on the button below you agree to our Terms of Service and allow MagariStela to share your phone number with potential customers. Any other personal information will, however, remain confidential.</p>
        <button type='submit' className="primaryButton createListingButton">
          Edit Listing
        </button>
      </form>
      </main>
      </div>
  )
}

export default EditListing;