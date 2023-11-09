import React from 'react'

function LinksPage() {
  return (
    <div className='flex w-full justify-between'>
        <div className=' flex flex-col gap-8 mt-4 w-full'>
            <h1 className='text-3xl my-4 font-bold'>Project Links</h1>
            <p><a target="_blank" rel="noreferrer" href='https://github.com/Aaditya2609/school-management-frontend' className="text-white bg-[#29b9f0ff] hover:text-[#29b9f0ff] hover:bg-[white] hover:border-2 hover:border-[#29b9f0ff] first-letter:focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Frontend Github</a></p>
            <p><a  target="_blank" rel="noreferrer" href='https://github.com/Aaditya2609/school-management-backend' className="text-white bg-[#29b9f0ff] hover:text-[#29b9f0ff]  hover:bg-[white] focus:ring-4 hover:border-2 hover:border-[#29b9f0ff] focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Backend Github</a></p>
            <p><a target="_blank"  rel="noreferrer" href='https://school-management-t9dl.onrender.com' className="text-white bg-[#29b9f0ff] hover:bg-[white] hover:text-[#29b9f0ff] hover:border-2 hover:border-[#29b9f0ff] first-letter:focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 ">Backend Live Link (https://school-management-t9dl.onrender.com)</a></p>
        </div>
    </div>
  )
}

export default LinksPage