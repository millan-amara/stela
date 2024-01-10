import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import axios from 'axios';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';


function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    sName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })
 
  const {sName, email, phone, password, confirmPassword} = formData;

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault(); 

    try {
      if(sName === '') {
        toast.error('Please enter your name')
      }
      if(email === '') {
        toast.error('Please enter your email')
      }
      if(phone === '') {
        toast.error('Please enter your phone number')
      }
      if(password === '') {
        toast.error('Please enter your password')
      }
      if(password === '') {
        toast.error('Please enter your password')
      }
      if(password !== confirmPassword) {
        toast.error('Passwords need to match!')
        throw Error
      }
     
      await axios.post('/register', formData)
      .then((response) => {
        toast.success(`Welcome, ${response.data.sName}`)
      })
      .catch((error) => {
        console.log(error)
      });

      navigate("/profile");

    } catch (error) {
      toast.error('Please check your details and try again')
    }
  }


  return (
    <>
      <div className='pageContainer'>
        <main className='signMain'>
          <form onSubmit={onSubmit}>
            <input
              className='nameInput'
              type='text'
              id='sName'
              placeholder='Name'
              value={sName}
              onChange={onChange}
            />

            <input
              className='emailInput'
              type='email'
              id='email'
              placeholder='Email'
              value={email}
              onChange={onChange}
            />

            <input
              className='emailInput'
              type='text'
              id='phone'
              placeholder='07...'
              value={phone}
              onChange={onChange}
            />

            <div className='passwordInputDiv'>
              <input
                type={showPassword ? 'text' : 'password'}
                className='passwordInput'
                placeholder='Password'
                id='password'
                value={password}
                onChange={onChange}
              />

              <img src={visibilityIcon} alt='show password' className='showPassword'
                onClick={() => setShowPassword((prevState) => !prevState)} />
            </div>
            <div className='passwordInputDiv'>
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className='passwordInput'
                placeholder='Confirm Password'
                id='confirmPassword'
                value={confirmPassword}
                onChange={onChange}
              />

              <img src={visibilityIcon} alt='show password' className='showPassword'
                onClick={() => setShowConfirmPassword((prevState) => !prevState)} />
            </div>

            <Link to='/forgot-password' className='forgotPasswordLink'>
                Forgot Password
            </Link>

            <div className='signUpBar'>
              <p className='signUpText'>Sign Up</p>
              <button className='signUpButton'>
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          {/* GOOGLE OAUTH */}
          {/* <OAuth /> */}

          <Link to='/sign-in' className='registerLink'>
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
    
  )
}

export default SignUp