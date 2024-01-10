import React, { useState } from 'react'


function ForgotPassword() {

  const [email, setEmail] = useState('');

  const onChange = (e) => {
    setEmail(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log(e)
  }


  return (
    <>

      <p>We'll help you reset!</p>
      <form action="" onSubmit={onSubmit}>
        <input 
          type='email'
          placeholder='Enter email'
          id='email'
          value={email}
          onChange={onChange}
        />
        <button>Submit</button>
      </form>
      
    </>
    

    
  )
}

export default ForgotPassword