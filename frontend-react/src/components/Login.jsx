import {useContext} from 'react'
import { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios' // Import axios for making HTTP requests in react
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../AuthProvider'

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const {isLoggedIn, setIsLoggedIn} = useContext(AuthContext); // notice the curly braces. This is object destructuring to extract values from the context object not the useState array

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userData = {username, password}
        console.log(userData);

        try{
            const response = await axios.post('http://127.0.0.1:8000/api/v1/token/', userData); // await makes the code wait here until the request completes. otherwise, JS will move to the next line immediately and response will be undefined
            localStorage.setItem('accessToken', response.data.access); // Store the access token in local storage
            localStorage.setItem('refreshToken', response.data.refresh); // Store the refresh token in local storage
            console.log("Login Success!");
            setIsLoggedIn(true); // Update the login state in context
            navigate('/dashboard'); // Redirect to dashboard after successful login
        }catch(error){
            console.log("Login Error: ", error);
            setError('Invalid username or password');
        }finally{
            setLoading(false);
        }
    }

  return (
    <>
        <div className="container">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 bg-light-dark p-5 rounded">
                    <h2 className='text-light text-center mb-4'>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className='mb-3'>
                            <input type="text" className='form-control' placeholder='Username' value={username} onChange={(e)=>setUsername(e.target.value)}/>
                        </div>
                        
                        <div className="mb-5">
                            <input type="password" className='form-control' placeholder='Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
                            {error && <div className='text-danger'>{errors}</div>}
                        </div>
    
                        {loading ? (<button className='btn btn-info d-block mx-auto' disabled><FontAwesomeIcon icon={faSpinner} spin/>Logging in...</button>) : (
                            <button className='btn btn-info d-block mx-auto'>Login</button>
                        )
    
                        // To see this in action Loading... and Register. Go to Network tab and set the no throttling to slow 3G or Regular 3G
                            
                        } 
                        {/* The (...) parts are grouping parentheses, not curly braces.
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

export default Login