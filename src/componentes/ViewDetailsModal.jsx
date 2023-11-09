import React from 'react'

function ViewDetailsModal({ setShowDetailsModal, data, type }) {
    const datadate=new Date(data.date)
    const totalRoles=data.volunteerRoles?.reduce((acc,cv)=>acc+cv.requiredVolunteers,0)
    const registeredVolunteers=data.registeredVolunteers?.length
    return (
        <div>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70 z-100">
                <div className={`bg-[rgba(255,255,255,1)] p-4 rounded-xl w-[45%] ${type==="volunteers"?"":"h-[90vh]"} overflow-auto `}>
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl self-start px-4 my-4 font-bold text-black">
                            {data.name}'s Details
                        </h1>
                        <button
                            className="m-1 flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-1 px-2 border-2 border-[#29b9f0ff] rounded-sm whitespace-nowrap"
                            onClick={() => setShowDetailsModal(false)}
                        >
                            X
                        </button>
                    </div>
                    <div className='flex items-center justify-center'>
                        {type === "volunteers" ? (<div className='flex w-full font-semibold text-xl flex-col justify-center my-8 overflow-auto'>
                            <p className='flex justify-between  mx-[4rem]'>
                                Name: <span className='w-[60%] text-right'> {data.name}</span>
                            </p>
                            <p className='flex justify-between mx-[4rem]'>
                                Contact Information: <span className='w-[60%] text-right'>{data.contactInformation}</span>
                            </p>
                            <p className='flex justify-between mx-[4rem]'>
                                Skills: <span className='w-[60%] text-right'>{data.skills.map((item, index) => (
                                    <React.Fragment key={item}>
                                        {item}
                                        {index < data.skills.length - 1 && ', '}
                                    </React.Fragment>
                                ))}</span>
                            </p>
                            <p className='flex justify-between mx-[4rem]'>
                                Availability: <span className='w-[60%] text-right'>{data.availability}</span>
                            </p>
                            <p className='flex justify-between mx-[4rem]'>
                                Areas Of Intrest: <span className='w-[60%] text-right'>{data.areasOfInterest.map((item, index) => (
                                    <React.Fragment key={item}>
                                        {item}
                                        {index < data.areasOfInterest.length - 1 && ', '}
                                    </React.Fragment>
                                ))}</span>
                            </p>
                            <p className='flex justify-between mx-[4rem]    '>
                                Events: <span className='w-[60%] text-right'>{data.events.map(item => {
                                    const date = new Date(item.date)
                                    return (<div className="flex flex-col items-start text-md " key={item._id}>
                                        <p className='flex justify-between  w-full'>Name: <span>{item.name}</span></p>
                                        <p className='flex justify-between  w-full'>Date: <span>{date.toLocaleString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}</span></p>
                                    </div>)
                                })}</span>
                            </p>
                        </div>) : <div className='flex w-[40rem] font-semibold text-xl flex-col justify-between my-8 px-4   '>
                            <p className='flex justify-between my-1'>
                                Name: <span className='w-[50%] text-left'>{data.name}</span>
                            </p>
                            <p className='flex justify-between my-1'>
                                Date: <span className='w-[50%] text-left'>{datadate.toLocaleString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                        })}
                                </span>
                            </p>
                            <p className='flex justify-between my-1'>
                                Location: <span className='w-[50%] text-left'>{data.location}</span>
                            </p>
                            <p className='flex justify-between my-1'>
                                Description: <span className='w-[50%] text-left '>{data.description}</span>
                            </p>
                            
                            <div className='flex justify-between my-1'>
                                Volunteer Roles: <span className='w-[50%]' >{data.volunteerRoles.map(item => <div className='flex flex-col items-start justify-start' key={item._id}>
                                    <p>Role: {item.role}</p>
                                    <p>Required Volunteers: {item.requiredVolunteers}</p>
                                </div>)}</span>
                            </div>
                            <p className='flex justify-between'>
                            Total Roles: <span className='w-[50%] text-left'>{totalRoles}</span>
                        </p>

                        <p className='flex justify-between'>
                            Registered Volunteers: <span className='w-[50%] text-left'>{registeredVolunteers}</span>
                        </p>
                            <div className='flex justify-between my-2'>
                                Registered Volunteers: <span className='flex flex-col items-start w-[50%]'>{data.registeredVolunteers.map(item => <div className='flex flex-col items-start' key={item._id}>
                                    <p>Name: {item.name}</p>
                                    <p className=''>Contact Information: <p><span>{item.contactInformation}</span></p></p>
                                </div>)}</span>
                            </div>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ViewDetailsModal