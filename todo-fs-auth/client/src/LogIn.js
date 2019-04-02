import React from 'react'
import FormProvider from './providers/FormProvider'



function LogIn() {

    const inputs = {
        email:'',
        password:''
    }
    return (
        <FormProvider inputs={inputs} submit={() => console.log('submit')}>
            {
                ({handleChange, handleSubmit}) => {
                    return(
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange} type="email" name='email' placeholder='enter email'/>
                            <input onChange={handleChange} type="password" name='password' placeholder='enter password'/>
                            <button>Log In</button>
                        </form>
                    )
                }
            }
        </FormProvider>
    )
}

export default LogIn
