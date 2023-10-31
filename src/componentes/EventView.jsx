import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Lists from './Lists';
import AddEditDetailsModal from './AddEditDetailsModal';
import { fetchEvents } from '../features/events/eventSlice';
import { fetchVolunteers } from '../features/volunteers/volunteerSlice';

function EventView() {
    const [showAddEditDetailsModal, setShowAddEditDetailModal] = useState(false);
    const [actionType, setActionType] = useState([])
    const dispatch = useDispatch();
    const events = useSelector((state) => state.events.events);
    const status = useSelector((state) => state.events.status);

    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchVolunteers());
            dispatch(fetchEvents());
        }
    }, [status, dispatch]);
   

    const handleAddEvent = () => {
        setActionType("add")
        setShowAddEditDetailModal(true)
    }
    return (
        <div>
            {status === "loading" ? (<div className='text-3xl my-4 font-bold fixed top-1/2 left-1/2' > Loading Data...</div>) : (
                <div className='flex flex-col w-full items-center h-[100vh] overflow-auto'>
                    <h1 className='text-3xl my-4 font-bold'>All Events</h1>
                    <button onClick={() => handleAddEvent()} className="m-1 flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-2 px-4 border-2 border-[#29b9f0ff] rounded whitespace-nowrap">Add Event</button>
                    <Lists data={events} dataType="events" />
                </div>)}
            {showAddEditDetailsModal && <AddEditDetailsModal setShowAddEditDetailModal={setShowAddEditDetailModal} data={[]} type="event" action={actionType}/>}
            </div>
    )
}

            export default EventView