import React,{useState} from 'react'


const Login = () => {

    const[user, setUser] = useState({
        userName: "",
        password:""
    })

    const [person,setPerson] = useState('')


    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setUser({...user,[name]: value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const newUser = {...user}
        setPerson([...person, newUser])
        setUser({userName: "",password:""})
    }

    return (
        <div>
            
        < form onSubmit={handleSubmit}>
            {/* username  */}
            <label id="userName">userName</label>
            <input type="text" name="userName" value={user.userName} onChange={handleChange}/>

            {/* password  */}
            <label id="pasword">password</label>
            <input type="text" name="password" value={user.password} onChange={handleChange}/>

            <input type="submit" value="submit" />
        </form>

        </div>
    )
}

export default Login
