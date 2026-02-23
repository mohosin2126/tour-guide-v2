import React from 'react'
import Title from '../../../../components/reuseable/title/inex.jsx'
import { MdDateRange } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function Blogs({blogData}) {
    return (
        <div>
            <Title title="Our Blog" subTitle="Get Latest News Update" className="text-center" />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
               {
                blogData && blogData?.map((blog,index)=>(
                    <Link to={''} key={index} className="rounded-lg group">
                    <div className='w-full h-[280px] rounded-t-lg overflow-hidden relative'>
                        <img
                            src="https://image.tmdb.org/t/p/original/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg"
                            alt="card-image"
                            className='w-full h-full rounded-t-lg hover:scale-110 [transition:0.5s]'
                        />
                    </div>
                    <div className='flex items-start justify-start flex-col gap-4 mt-3 p-4'>
                        <div className='flex gap-5'>
                            <button className='bg-[#fff7f2] border border-[#ff710a] px-5 py-1 rounded-md text-[#ff710a] text-lg font-semibold capitalize'>travel blog</button>
                            <div className='flex gap-3 items-center'>
                                <MdDateRange size={26} />
                                <p className='text-lg'>December 5, 2023</p>
                            </div>
                        </div>
                        <h1 className='text-[1.5rem] font-bold text-white group-hover:text-[#FF6B00] [transition:0.5s]'>
                        Find who are giving service Booking travel during Corona
                        </h1>
                    </div>
                </Link>
                ))
               }
            </div>
        </div>
    )
}
