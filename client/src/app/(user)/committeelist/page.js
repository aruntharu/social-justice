'use client'
import React,{ useEffect, useState} from 'react';
import axios from 'axios';
import { BiTrash } from 'react-icons/bi';
import { FiFilePlus } from "react-icons/fi";
import { useRouter } from 'next/navigation';

const page = () => {
    const router = useRouter()
  const [committeeList, setCommitteeList] = useState([])
  useEffect(()=>{
    fetchCommittee()
  },[])
  const fetchCommittee=async()=>{
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}committee`);
    setCommitteeList(data)
  }
  

  const deleteItem =async(id)=>{
    const {data} = await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}committee/`+id)
    if(data){
      fetchCommittee()
    }
  }


  const [image, setImage] = useState(null)
  return (
    <div className="mx-10">
      <div className='flex' onClick={()=>router.push('/committeelist/add-committee')}><p className='flex'> <FiFilePlus className='size-6' />Add Committee</p></div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto ">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
                <thead>
                    <tr>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                          Full Name
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Designation
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Image
                        </th>
                        <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                {committeeList.length> 0 && committeeList.map((item)=>{
               return( <tr>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <div className="flex items-center">
                                    <div className="ml-3">
                                        <p className="text-gray-900 whitespace-no-wrap">
                                            {item.fullName}
                                        </p>
                                    </div>
                                </div>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                                {item.designation}
                            </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <p className="text-gray-900 whitespace-no-wrap">
                            image
                            </p>
                        </td>
                        <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                            <span
                                className="relative inline-block px-3 py-1 font-semibold text-green-900 leading-tight">
                                <span aria-hidden
                                    className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                            <span className="relative">
                            <BiTrash onClick={()=>deleteItem(item._id)}/>
                            </span>
                            </span>
                        </td>
                    </tr>)
                        })}
                </tbody>
            </table>
            </div>
            </div>

   </div>);
};



export default page