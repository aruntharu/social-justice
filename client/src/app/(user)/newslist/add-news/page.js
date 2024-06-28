'use client'
import React,{useState} from 'react';
import { useFormik } from 'formik';
import { Input} from '@nextui-org/react';
import toast from 'react-hot-toast';
import { FaBackspace } from "react-icons/fa";
import {Button} from "@nextui-org/react";
import Link from 'next/link';

const page = () => {
  const newsDetails= [
    {name:'newsHeading', label:'News Heading'},
     {name:'newsIntro', label:'News Intro'}, 
     {name:'newsDescription', label:'News Description'},  
     {name:'newsDate', label:'News Date'}, 
  ];


  const formik = useFormik({
    initialValues: {
      newsHeading:'',
      newsIntro: '',
      newsDescription: '',
      newsDate: '',
    },
    onSubmit: values => {
      submitNews(values)
    },
  });

  const submitNews = async(values) => {
    let formData = new FormData(); 
    formData.append('newsHeading', values.newsHeading); 
    formData.append('newsIntro', values.newsIntro);
    formData.append('newsDescription', values.newsDescription);
    formData.append('newsDate', values.newsDate);
    formData.append('newsImage', image);

    

    const requestOptions = {
      method: 'POST',
      body: formData
  };
  const response = await fetch('http://localhost:8000/news', requestOptions);
  const data = await response.json()
  if(data.msg){
    toast(data.msg)
  }
  }

  const [image, setImage] = useState(null)
  return (
    <form className='m-4 flex flex-col border shadow-md rounded-lg p-4' onSubmit={formik.handleSubmit}>
      <div className='flex' ><Link href="/newslist"><FaBackspace className='size-6 mr-1'/></Link><p className='flex'>Back</p></div>
      <h1 className='text-4xl text-green-300'>Add News</h1>
     {newsDetails.map((item)=>{
      return (
        <div>
           <label htmlFor={item.name}>{item.label}</label>
      <Input
        id={item.name}
        name={item.name}
        type="text"
        onChange={formik.handleChange}
        value={formik.values[item.name]}
      />
        </div>
      )
     })}

     <input  type="file" onChange={(e)=>setImage(e.target.files[0])}/>
      
     
      <div className='flex'>
      <Button color="success" className='p-2 my-4 mr-4 w-[10%] flex' type="submit" >Submit</Button>
      </div>
    </form>
  );
};

export default page