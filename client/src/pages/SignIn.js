import React, { useState } from 'react';
import {toast} from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as ArrowRightIcon } from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';
import axios from 'axios';

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const {email, password} = formData;

  const navigate = useNavigate()

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();

    try{
      await axios.post('/login', formData)
      .then((response) => {
          console.log(response)
      })
      .catch((error) => {
          console.log(error)
      })
      navigate('/')

    } catch (error) {
      toast.error('Wrong email or password')
    }
  }


  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <main className='signMain'>
          <form onSubmit={onSubmit}>
            <input
              className='emailInput'
              type='email'
              id='email'
              placeholder='Email'
              value={email}
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

            <Link to='/forgot-password' className='forgotPasswordLink'>
                Forgot Password
            </Link>

            <div className='signInBar'>
              <p className='signInText'>Sign In</p>
              <button className='signInButton'>
                <ArrowRightIcon fill='#ffffff' width='34px' height='34px' />
              </button>
            </div>
          </form>

          {/* GOOGLE OAUTH */}
          {/* <OAuth /> */}

          <Link to='/sign-up' className='registerLink'>
            Sign Up Instead
          </Link>
        </main>
      </div>
    </>
    
  )
}

export default SignIn