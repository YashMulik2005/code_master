import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import themehook from './CodeContext'


function Profile() {
    const navigate = useNavigate()
    const { logedin, setlogedin, setcontextusername } = themehook()
    const url = import.meta.env.VITE_BACKEND;

    const handlelogout = async () => {
        localStorage.removeItem("username");
        setlogedin(false)
        setcontextusername("")
        navigate("/")
    }

    const handleadd = () => {
        const data = {
            "c_id": "64b423e65bca564c5132eb71",
            "t_id": "64b53a504a5d0eef3cb1eb10",
            "u_id": "yash02",
            "status": "completed"
        }

        const res = axios.post(`${url}/user/add`, { data: data })
        console.log(res);
    }

    return (
        <div >
            <button onClick={handlelogout}>logout</button>
            <button onClick={handleadd}>add</button>
        </div>
    )
}

export default Profile