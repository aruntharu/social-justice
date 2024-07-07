'use client'
import CustomNavBar from '@/components/navbar/page'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import {Button} from "@nextui-org/react";

const News = () => {
  const router = useRouter()
  const [newsList, setNewsList] = useState([])
  useEffect(()=>{
    fetchnewsList()
  },[])
  
  const fetchnewsList= async()=>{
    const {data} =await axios.get(`http://localhost:8000/news`)
    setNewsList(data)
  }
  return (
 <div>
  <CustomNavBar/>
  {newsList.map((item)=>{
      return (
        <section className="text-gray-600 body-font overflow-hidden">
        <div className="container px-10 py-10 mx-auto">
          <div className="-my-8 divide-y-2 divide-gray-100">
            <div className="py-8 flex flex-wrap md:flex-nowrap">

              <div className="md:flex-grow">
                <h2 className="text-2xl font-medium text-gray-900 title-font mb-2">{item.newsHeading}</h2>
                <p className="mt-1 text-gray-500 text-sm ">12 Jun 2019</p>
                <p className="leading-relaxed mb-4 ">{item.newsDescription.slice(0,350)+'.......'}</p>
                <Button onClick={()=> router.push('/news/'+item._id)} color="primary">Read More</Button>
              </div>
            </div>
            <div className="flex flex-wrap md:flex-nowrap">
            </div>
          </div>
        </div>
      </section>
      )
  })}
 </div>
  )
} 
 
export default News