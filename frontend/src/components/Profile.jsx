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

    // const handleadd = () => {
    //     const data = {
    //         "c_id": "64b423e65bca564c5132eb71",
    //         "username": "yash02",
    //     }

    //     const res = axios.post(`${url}/user/add`, { data: data })
    //     console.log(res);
    // }

    return (
        <div >
            <button onClick={handlelogout}>logout</button>
            {/* <button onClick={handleadd}>add</button> */}
        </div>
    )
}

export default Profile