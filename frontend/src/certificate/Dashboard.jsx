import React from 'react'
import { Link, useParams } from 'react-router-dom'

function Dashboard() {
    const { id } = useParams()
    console.log(id);
    return (
        <div>
            <button className=' bg-green-500 text-white py-1 px-3'><Link to={`/certificate/question`}>start</Link></button>
        </div>
    )
}

export default Dashboard