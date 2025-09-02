import React from 'react'
import { useState } from 'react'
import axios from 'axios' // Import axios for making HTTP requests in react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

const Regitser = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleRegistraion = async (e) => {
        e.preventDefault();
        setLoading(true)
        const userData = {username, email, password}

        try{
            // axios.post('http://localhost:5000/api/v1/auth/register', userData)
            // .then((res)=>{
            //     console.log("Registration Success: ", res);
            // })
            const response = await axios.post('http://127.0.0.1:8000/api/v1/register/', userData);
            console.log("Registration Success: ", response);
            setErrors({}); // Clear errors on successful registration
            setSuccess(true);
        }
        catch(error){
            setErrors(error.response.data);
            console.log("Registration Error: ", error);
        }finally{
            setLoading(false);
        }


        console.log(userData);
    }

  return (
    <>
    <div className="container">
        <div className="row justify-content-center align-items-center">
            <div className="col-md-6 bg-light-dark p-5 rounded">
                <h2 className='text-light text-center mb-4'>Register</h2>
                <form onSubmit={handleRegistraion}>
                    <div className='mb-3'>
                        <input type="text" className='form-control' placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        <small>{errors.username && <div className='text-danger'>{errors.username}</div> }</small>
                    </div>
                    <div className="mb-3">
                        <input type="email" className='form-control' placeholder='Email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
                        <small>{errors.email && <div className='text-danger'>{errors.email}</div> }</small>
                    </div>
                    
                    <div className="mb-5">
                        <input type="password" className='form-control' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                        <small>{errors.password && <div className='text-danger'>{errors.password}</div> }</small>
                        {success && <div className='alert alert-success mt-3'>Registration Successful!</div>}
                    </div>

                    {loading ? (<button className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin/>Loading...</button>) : (
                        <button className='btn btn-info d-block mx-auto'>Register</button>
                    )

                    // To see this in action Loading... and Register. Go to Network tab and set the no throttling to slow 3G or Regular 3G
                        
                    } 
                    {/* The (...) parts are grouping parentheses, not curly braces in {loading ? (<button className line.
They just group the JSX button elements so it’s more readable (especially across multiple lines).
                    Ternary operator to show loading state. No curly braces Because {} in JSX means “evaluate JS expression here”.
But inside the ternary, you’re already inside a JS expression (between the outer {}), so you can just directly write JSX. */}
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Regitser