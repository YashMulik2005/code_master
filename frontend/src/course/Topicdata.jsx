import React, { useEffect, useState } from 'react'
import themehook from '../components/CodeContext'
import axios from 'axios'

function Topicdata() {
    const { topic_id } = themehook()
    const [data, setdata] = useState()

    const getdata = async () => {
        const data = {
            "t_id": topic_id
        }
        const result = await axios.post("http://localhost:3000/course/singletopic", { data: data })
        console.log(result);
    }

    useEffect(() => {
        getdata()
    }, [])

    return (
        <div>
            {topic_id}
        </div>
    )
}

export default Topicdata