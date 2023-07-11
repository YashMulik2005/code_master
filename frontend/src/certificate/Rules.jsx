import React, { useEffect } from 'react'
import Aos from 'aos'
import 'aos/dist/aos.css'
import themehook from '../components/CodeContext'
import { Link, useParams } from 'react-router-dom'

function Rules() {
    const { theme } = themehook()
    const { id } = useParams()
    console.log(id);
    useEffect(() => {
        Aos.init({
            duration: 500,
            offset: 120
        });
    }, [])

    return (
        <div className=' flex '>
            <div className={`w-[40%] h-[100vh] flex justify-center items-center p-4 flex-col bg-green-800  text-white`}>
                <h1>yugewfyevguye</h1>
                <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Autem corporis debitis, placeat neque impedit saepe animi ea, vel laboriosam commodi dolorem cupiditate.</p>
            </div>
            <div className=' w-[60%] h-[100vh] p-4 overflow-y-auto py-40'>
                <div className=' flex justify-end my-16' data-aos="fade-left">
                    <section className=' w-[50%] p-3 m-4 bg-[#191919] shadow-lg' >
                        {/* <h1>buysvcuyvcvydsc</h1> */}
                        <p>aspernatur eius animi mollitia minus, numquam reprehenderit pariatur perferendis odit doloribus, quo possimus officiis inventore. Laboriosam, perferendis provident.</p>
                    </section>
                </div>
                <div className=' flex justify-start' data-aos="fade-right">
                    <section className=' w-[50%] border-2 p-3 m-4'>
                        {/* <h1>buysvcuyvcvydsc</h1> */}
                        <p>aspernatur eius animi mollitia minus, numquam reprehenderit pariatur perferendis odit doloribus, quo possimus officiis inventore. Laboriosam, perferendis provident.</p>
                    </section>
                </div>
                <div className=' flex justify-end' data-aos="fade-left">
                    <section className=' w-[50%] border-2 p-3 m-4'>
                        {/* <h1>buysvcuyvcvydsc</h1> */}
                        <p>aspernatur eius animi mollitia minus, numquam reprehenderit pariatur perferendis odit doloribus, quo possimus officiis inventore. Laboriosam, perferendis provident.</p>
                    </section>
                </div>
                <button className=' bg-green-500 text-white px-4 py-1 rounded-3xl'><Link to={`/certificate/dashboard/${id}`}> start </Link></button>


            </div>
        </div>
    )
}

export default Rules