import React,{useState,useEffect} from 'react'

import axios from 'axios'
import { Navigate,useLocation,Link } from "react-router-dom";

const Login = () => {
   
    let location = useLocation();

    const[userForm, setUserForm] = useState({
        userName: "",
        password:""
    })

    // const [person,setPerson] = useState('')
    const [token, setToken] = useState(null)


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUserForm({...userForm,[name]: value})
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
           const {data:user} = await axios.post('/api/v1/user/login',userForm)
           localStorage.setItem('token', user.token)
           const userKey = localStorage.getItem('token')
            // console.log(userKey)
            if(!userKey){
                console.log('user data is wrong')
                return
            }
            setToken(userKey)
        } catch (error) {
            console.log(error)
        }
        // const userLogin = await axios.post('api/v1/user/login',user)
        // console.log(userLogin)
        // const userData = 

        // const newUser = {...user}
        // setPerson([...person, newUser])
        // setUser({userName: "",password:""})
    }

    if(token){
      return  <Navigate  to="/expense"  replace/>
        // <Link to="/expense"></Link>
    }

    return (
        <div>
            
        < form onSubmit={handleSubmit}>
            {/* username  */}
            <label htmlFor="userName">userName</label>
            <input type="text" name="userName" value={userForm.userName} onChange={handleChange}/>

            {/* password  */}
            <label htmlFor="pasword">password</label>
            <input type="text" name="password" value={userForm.password} onChange={handleChange}/>

            <button type="submit" >LOGIN</button>
        </form>

        </div>
    )
}

export default Login
