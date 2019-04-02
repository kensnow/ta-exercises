import React, {useState} from 'react'
import FormProvider from './providers/FormProvider'


function SignUp() {

    const [errMsg, setErrMsg] = useState('')

    const inputs = {
        email:'',
        password:'',
        confirm:''
    }
    return (
        <FormProvider inputs={inputs} submit={(inputs) => {
            inputs.password === inputs.confirm ? console.log('yes') : setErrMsg('Please enter matching passwords')
            }}>
            {
                ({handleChange, handleSubmit}) => {
                    return(
                        <form onSubmit={handleSubmit}>
                            <input onChange={handleChange} type="email" name='email' placeholder='enter email'/>
                            <input onChange={handleChange} type="password" name='password' placeholder='enter password'/>
                            <input onChange={handleChange} type="password" name='confirm' placeholder='confirm password'/>
                            <button>Sign Up</button>
                            {errMsg && <p className="error">{errMsg}</p>}
                        </form>
                    )
                }
            }
        </FormProvider>
    )
}

export default SignUp
