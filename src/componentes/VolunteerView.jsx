import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchVolunteers } from '../features/volunteers/volunteerSlice';
import Lists from './Lists';
import AddEditDetailsModal from './AddEditDetailsModal';
import { fetchEvents } from '../features/events/eventSlice';

function VolunteerView() {
    const [showAddEditDetailsModal, setShowAddEditDetailModal] = useState(false);
    const [actionType, setActionType] = useState([])
    const dispatch = useDispatch();
    const volunteers = useSelector((state) => state.volunteers.volunteers);
    const status = useSelector((state) => state.volunteers.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchVolunteers());
            dispatch(fetchEvents());
        }
    }, [status, dispatch]);
   

    const handleAddVolunteer = () => {
        setActionType("add")
        setShowAddEditDetailModal(true)
    }
    return (
        <div>
            {status === "loading" ? (<div className='text-3xl my-4 font-bold fixed top-1/2 left-1/2' > Loading Data...</div>) : (
                <div className='flex flex-col w-full items-center h-[100vh] overflow-auto'>
                    <h1 className='text-3xl my-4 font-bold'>All Volunteers</h1>
                    <button onClick={() => handleAddVolunteer()} className="m-1 flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-2 px-4 border-2 border-[#29b9f0ff] rounded whitespace-nowrap">Add Volunteer</button>
                    <Lists data={volunteers} dataType="volunteers" />
                </div>)}
            {showAddEditDetailsModal && <AddEditDetailsModal setShowAddEditDetailModal={setShowAddEditDetailModal} data={[]} type="volunteer" action={actionType}/>}
            </div>
    )
}

            export default VolunteerView