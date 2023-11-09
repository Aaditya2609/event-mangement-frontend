import React, { useState } from 'react'
import ViewDetailsModal from './ViewDetailsModal';
import { useDispatch } from 'react-redux';
import { deleteVolunteerAsync } from '../features/volunteers/volunteerSlice';
import { deleteEventAsync } from '../features/events/eventSlice';
import AddEditDetailsModal from './AddEditDetailsModal';

function Lists({ data, dataType }) {
    const [showDetailsModal, setShowDetailsModal] = useState(false)
    const [modalData, setModalData] = useState([]);
    const [modalDataType, setModalDataType] = useState([]);
    const [actionType, setActionType] = useState("")
    const [showAddEditDetailsModal, setShowAddEditDetailModal] = useState(false);
    const dispatch = useDispatch();
    const handleDetails = (item) => {
        setModalData(item);
        setModalDataType(dataType);
        setShowDetailsModal(true);

    }
    const handleDelete = (id) => {
        if (dataType === "volunteers") {
            dispatch(deleteVolunteerAsync(id))
        }
        else
            dispatch(deleteEventAsync(id))
    }
    const handleEdit = (item) => {
        if (dataType === "volunteers") {
            setModalDataType("volunteer")
            setModalData(item)
            setActionType("edit")
            setShowAddEditDetailModal(true)
        }
        else {
            setModalDataType("event")
            setModalData(item)
            setActionType("edit")
            setShowAddEditDetailModal(true)

        }
    }
    return (

        <div className='flex flex-wrap items-center justify-center gap-4'>
            {data.map(item => {
                const datadate = new Date(item.date)
                const totalRoles=item.volunteerRoles?.reduce((acc,cv)=>acc+cv.requiredVolunteers,0)
                const registeredVolunteers=item.registeredVolunteers?.length
                return (<div key={item._id} className='border-2 p-2 border-[#29b9f0ff] flex flex-col items-start rounded-xl w-[35%] text-lg'>
                    {dataType === "volunteers" ? (<div className='flex w-full flex-col justify-between'>
                        <p className='flex justify-between'>
                            Name: <span>{item.name}</span>
                        </p>
                        <p className='flex justify-between'>
                            Contact Information: <span className='flex'>{item.contactInformation}</span>
                        </p>
                        <p className='flex justify-between'>
                            Skills: <span>{item.skills?.map((items, index) => (
                                <React.Fragment key={items}>
                                    {items}
                                    {index < item.skills?.length - 1 && ', '}
                                </React.Fragment>
                            ))}</span>
                        </p>
                        <p className='flex justify-between'>
                            Availability: <span>{item.availability}</span>
                        </p>
                    </div>) : <div className='flex w-full flex-col justify-between text-xl py-2'>
                        <p className='flex justify-between'>
                            Name: <span>{item.name}</span>
                        </p>
                        <p className='flex justify-between text-right'>
                            Description: <span>{item.description}</span>
                        </p>
                        <p className='flex justify-between'>
                            Date: <span>{datadate.toLocaleString(undefined, {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric',
                            })}
                            </span>
                        </p>
                        <p className='flex justify-between'>
                            Total Roles: <span>{totalRoles}</span>
                        </p>
                        <p className='flex justify-between'>
                            Registered Volunteers: <span>{registeredVolunteers}</span>
                        </p>
                        <p className='flex justify-between'>
                            Location: <span>{item.location}</span>
                        </p>
                    </div>}
                    <div className='flex w-full  flex-col items-center gap-2  justify-center my-2'>
                        <button className="flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-lg text-[#29b9f0ff] font-semibold p-1 border-2 border-[#29b9f0ff] rounded whitespace-nowrap" onClick={() => handleDetails(item)}>View Details</button>
                        <div className='flex gap-4'>
                            <button onClick={() => handleEdit(item)} className="flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-lg text-[#29b9f0ff] font-semibold p-1 border-2 border-[#29b9f0ff] rounded whitespace-nowrap">{dataType === "volunteers" ? (<div>Edit Volunteer</div>) : (<div>Edit Event</div>)}</button>
                            <button onClick={() => handleDelete(item._id)} className="flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-lg text-[#29b9f0ff] font-semibold p-1 border-2 border-[#29b9f0ff] rounded whitespace-nowrap">{dataType === "volunteers" ? (<div>Delete Volunteer</div>) : (<div>Delete Event</div>)}</button>
                        </div>
                    </div>
                </div>)
            })}
            {showDetailsModal && <ViewDetailsModal setShowDetailsModal={setShowDetailsModal} data={modalData} type={modalDataType} />}
            {showAddEditDetailsModal && <AddEditDetailsModal setShowAddEditDetailModal={setShowAddEditDetailModal} data={modalData} type={modalDataType} action={actionType} />}
        </div>
    )
}

export default Lists