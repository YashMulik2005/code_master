import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import themehook from './CodeContext'


function Profile() {
    const navigate = useNavigate()
    const { logedin, setlogedin, setcontextusername } = themehook()
    const handlelogout = async () => {
        const result = await axios.get("http://localhost:3000/user/profile")
        console.log(result);
        if (result.data.data.sucess) {
            setlogedin(false)
            setcontextusername("")
            navigate("/")
        }
    }

    return (
        <div >
            <button onClick={handlelogout}>logout</button>
        </div>
    )
}

export default Profile