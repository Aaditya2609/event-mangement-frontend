import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addVolunteerAsync, fetchVolunteers, updateVolunteerAsync } from '../features/volunteers/volunteerSlice';
import { addEventAsync, updateEventAsync } from '../features/events/eventSlice';

function AddEditDetailsModal({ setShowAddEditDetailModal, type, data, action }) {
    const [editVolunteerId,setEditVolunteerId]=useState("");
    const [tempVolunteer, setTempVolunteer] = useState({
        name: "",
        contactInformation: "",
        skills: [],
        availability: "",
        areasOfInterest: [],
        events: [],
    });

    const [tempEvent, setTempEvent] = useState({
        name: "",
        date: "",
        location: "",
        description: "",
        volunteerRoles: [],
        registeredVolunteers: [],
        newRole: "",
        newRequiredVolunteers: 0,
    });

    const [tempVolunteerRoles, setTempVolunteerRoles] = useState({
        newRole: "",
        newRequiredVolunteers: 0,
    })
    const [tempVolunteerEvent, setTempVolunteerEvent] = useState({})
    const [notRegisteredEvents, setNotRegisteredEvents] = useState([])

    const dispatch = useDispatch();
    const events = useSelector((state) => state.events.events);
    const volunteers = useSelector((state) => state.volunteers.volunteers);

    useEffect(() => {
        if (action === "edit" && data) {
            if (type === "volunteer") {
                const { _id, ...tempVolunteerWithoutId } = data;
                setEditVolunteerId(_id);
                setTempVolunteer(tempVolunteerWithoutId);
            } else if (type === "event") {
                const { _id, ...tempEventWithoutId } = data;
                setTempEvent(tempEventWithoutId);
            }
        }

    }, [action, data, type]);
    useEffect(() => {
        setNotRegisteredEvents(events.filter(item => !tempVolunteer.events.some(tempEvent => tempEvent._id === item._id)))
    }, [tempVolunteer, events])


    const handleAddEdit = () => {
        if (type === "volunteer") {
            console.log(tempVolunteer)
            if (tempVolunteer.name !== "" && tempVolunteer.contactInformation !== "" && tempVolunteer.skills.length > 0) {
                if (action === "add") {
                    dispatch(addVolunteerAsync(tempVolunteer));

                } else if (action === "edit") {
                    // Extract event IDs
                    const eventIds = tempVolunteer.events.map((event) => event._id);
                  
                    // Update tempVolunteer with event IDs
                    const updatedTempVolunteer = { ...tempVolunteer };
                    updatedTempVolunteer.events = eventIds;
                    setTempVolunteer(updatedTempVolunteer);
                  
                    // Update events and dispatch actions
                    tempVolunteer.events.map( (event) => {
                      // Extract volunteer IDs
                      const volunteerIds = event.registeredVolunteers.map((volunteer) => volunteer._id);
                  
                      
                      volunteerIds.push(editVolunteerId);
                      console.log("volunteer IDs",volunteerIds)
                  
                      // Create a new object with the updated registeredVolunteers property
                      const updatedEvent = { ...event, registeredVolunteers: volunteerIds };
                  
                      // Dispatch updateEventAsync action
                      return dispatch(updateEventAsync({ id: event._id, updatedEvent }));
                    });
                  
                    // Dispatch updateVolunteerAsync action
                    dispatch(updateVolunteerAsync({ id: data._id, updatedVolunteer: updatedTempVolunteer }));
                  }
                  
                  
                dispatch(fetchVolunteers());
                setShowAddEditDetailModal(false);
            } else {
                alert("Please fill all the required fields and add at least one skill.");
            }
        } else if (type === "event") {
            if (
                tempEvent.name !== "" &&
                tempEvent.date !== "" &&
                tempEvent.location !== "" &&
                tempEvent.description !== "" &&
                tempEvent.volunteerRoles.length > 0
            ) {
                if (action === "add") {
                    dispatch(addEventAsync(tempEvent));
                } else if (action === "edit") {
                    dispatch(updateEventAsync({ id: data._id, updatedEvent: tempEvent }));
                }
                dispatch(fetchVolunteers());
                setShowAddEditDetailModal(false);
            } else {
                alert("Please fill all the required fields and add at least one volunteer role.");
            }
        }
    };

    const addSkill = (skill) => {
        setTempVolunteer({ ...tempVolunteer, skills: [...tempVolunteer.skills, skill] });
    };

    const addAreaOfInterest = (area) => {
        setTempVolunteer({ ...tempVolunteer, areasOfInterest: [...tempVolunteer.areasOfInterest, area] });
    };
    const addRegisteredEvents = (event) => {
        if (action === "add")
            setTempVolunteer({ ...tempVolunteer, events: [...tempVolunteer.events, event] });
        else if (action === "edit") {
            const foundEvent = events.find(item => item._id === event._id);
            setTempVolunteer({ ...tempVolunteer, events: [...tempVolunteer.events, foundEvent] });
        }
    };

    const addVolunteerRole = () => {
        if (tempVolunteerRoles.newRole && tempVolunteerRoles.newRequiredVolunteers > 0) {
            const newVolunteerRole = {
                role: tempVolunteerRoles.newRole,
                requiredVolunteers: tempVolunteerRoles.newRequiredVolunteers,
            };
            setTempEvent({
                ...tempEvent,
                volunteerRoles: [...tempEvent.volunteerRoles, newVolunteerRole],
            });
        }
    };


    return (
        <div>
            <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-70 z-100">
                <div className="bg-[rgba(255,255,255,1)] p-4 rounded-xl w-[35%]">
                    <div className="flex justify-between items-center">
                        <h1 className="text-3xl self-start px-4 my-4 font-bold text-black">
                            {type === "volunteer" ? (
                                action === "add" ? "Add Volunteer" : "Edit Volunteer"
                            ) : (
                                action === "add" ? "Add Event" : "Edit Event"
                            )}
                        </h1>
                        <button
                            className="m-1 flex items-center bg-[white] hover:bg-[#29b9f0ff] hover:text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-1 px-2 border-2 border-[#29b9f0ff] rounded-sm whitespace-nowrap"
                            onClick={() => setShowAddEditDetailModal(false)}
                        >
                            X
                        </button>
                    </div>
                    {type === "volunteer" ? (
                        <div className="flex flex-col items-center">
                            <label className="flex gap-4 m-2 px-6 w-full justify-between">
                                Name:
                                <input
                                    className="border-2 border-black rounded-md px-2 py-1"
                                    onChange={(e) => setTempVolunteer({ ...tempVolunteer, name: e.target.value })}
                                    value={tempVolunteer.name}
                                ></input>
                            </label>
                            <label className="flex gap-4 m-2 px-6 w-full justify-between">
                                Contact Information (Email):
                                <input
                                    className="border-2 border-black rounded-md px-2 py-1"
                                    onChange={(e) => setTempVolunteer({ ...tempVolunteer, contactInformation: e.target.value })}
                                    value={tempVolunteer.contactInformation}
                                ></input>
                            </label>
                            <label className="flex gap-4 m-2 px-6 w-full justify-between">
                                Availability:
                                <select
                                    className="border-2 border-black rounded-md px-2 py-1"
                                    onChange={(e) => setTempVolunteer({ ...tempVolunteer, availability: e.target.value })}
                                    value={tempVolunteer.availability}
                                >
                                    <option value={""}>None</option>
                                    <option value={"Weekdays"}>Weekdays</option>
                                    <option value={"Weekends"}>Weekends</option>
                                    <option value={"Evenings"}>Evenings</option>
                                </select>
                            </label>
                            <div>
                                (Press enter to add multiple skills and areas of interests)
                            </div>
                            <div className="flex gap-4 m-2 px-6 w-full justify-between">
                                <label>Skills:</label>
                                <div>
                                    <div>
                                        <input
                                            className="border-2 border-black rounded-md px-2 py-1"
                                            type="text"
                                            placeholder="Add a skill"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    addSkill(e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                        ></input>
                                    </div>
                                    <div>
                                        {tempVolunteer.skills.map((skill, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <p>{skill}</p>
                                                <button
                                                    className="bg-[#29b9f0ff] text-white m-1 rounded-md p-1"
                                                    onClick={() => setTempVolunteer({ ...tempVolunteer, skills: tempVolunteer.skills.filter((_, i) => i !== index) })}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-4 m-2 px-6 w-full justify-between">
                                <label>Areas of Interest:</label>
                                <div className='flex flex-col'>
                                    <div>
                                        <input
                                            className="border-2 border-black rounded-md px-2 py-1"
                                            type="text"
                                            placeholder="Add an area of interest"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    addAreaOfInterest(e.target.value);
                                                    e.target.value = '';
                                                }
                                            }}
                                        ></input>
                                    </div>
                                    <div>
                                        {tempVolunteer.areasOfInterest.map((area, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <p>{area}</p>
                                                <button
                                                    className="bg-[#29b9f0ff] text-white m-1 rounded-md p-1"
                                                    onClick={() => setTempVolunteer({ ...tempVolunteer, areasOfInterest: tempVolunteer.areasOfInterest.filter((_, i) => i !== index) })}
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>

                                </div>

                            </div>
                            {action!=="add"?(<div><label className="flex gap-4 m-2 px-6 w-full justify-between">
                                Registered Events:
                                <select
                                    className="border-2 border-black rounded-md px-2 py-1"
                                    onChange={(e) => setTempVolunteerEvent(JSON.parse(e.target.value))}
                                >
                                    <option value={JSON.stringify({})}>None</option>
                                    {notRegisteredEvents.map(item => (
                                        <option value={JSON.stringify(item)} key={item._id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            </label>
                            <button className="bg-[#29b9f0ff] text-white m-1 rounded-md w-fit p-1 self-center" onClick={() => addRegisteredEvents(tempVolunteerEvent)}>Add Event Registration</button>
                            <div>{tempVolunteer.events.map((item, index) => <div key={item._id}>{item.name}
                                <button
                                    className="bg-[#29b9f0ff] text-white m-1 rounded-md p-1"
                                    onClick={() => setTempVolunteer({ ...tempVolunteer, events: tempVolunteer.events.filter((_, i) => i !== index) })}
                                >
                                    Remove
                                </button>
                            </div>)}

                            </div></div>):(<div></div>)}
                        </div>
                    ) : (
                        <div className="flex flex-col">
                            <label className="flex gap-4 m-2 w-full  px-6 justify-between">
                                Name
                                <input
                                    className="border-2 border-black rounded-md px-2 py-1"
                                    onChange={(e) => setTempEvent({ ...tempEvent, name: e.target.value })}
                                    value={tempEvent.name}
                                ></input>
                            </label>
                            <label className="flex gap-4 m-2 w-full  px-6 justify-between">
                                Date
                                <input
                                    type="date"
                                    className="border-2 border-black rounded-md px-2 py-1"
                                    onChange={(e) => setTempEvent({ ...tempEvent, date: e.target.value })}
                                    value={tempEvent.date}
                                ></input>
                            </label>
                            <label className="flex gap-4 m-2 w-full  px-6 justify-between">
                                Location
                                <input
                                    className="border-2 border-black rounded-md px-2 py-1"
                                    onChange={(e) => setTempEvent({ ...tempEvent, location: e.target.value })}
                                    value={tempEvent.location}
                                ></input>
                            </label>
                            <label className="flex gap-4 m-2 w-full  px-6 justify-between">
                                Description
                                <textarea
                                    className="border-2 border-black rounded-md px-2 py-1"
                                    onChange={(e) => setTempEvent({ ...tempEvent, description: e.target.value })}
                                    value={tempEvent.description}
                                ></textarea>
                            </label>
                            <div className="m-2 w-full px-6 flex" >
                                <div className='flex flex-col w-full'>
                                    <div className='flex flex-col w-full'>

                                        <div className="flex gap-4 justify-between w-full my-2">
                                            <label>Volunteer Roles:</label>
                                            <input
                                                className="border-2 border-black rounded-md px-2 py-1"
                                                type="text"
                                                placeholder="Add a role"
                                                onChange={(e) => setTempVolunteerRoles({ ...tempVolunteerRoles, newRole: e.target.value })}
                                            ></input>
                                        </div>
                                        <div className="flex gap-4 justify-between w-full my-2">
                                            <label>Required Volunteers:</label>
                                            <input
                                                className="border-2 border-black rounded-md px-2 py-1"
                                                type="number"
                                                placeholder="Required Volunteers"
                                                onChange={(e) => setTempVolunteerRoles({ ...tempVolunteerRoles, newRequiredVolunteers: e.target.value })}
                                            ></input>

                                        </div>
                                        <button className="bg-[#29b9f0ff] text-white m-1 rounded-md w-fit p-1 self-center" onClick={addVolunteerRole}>Add Volunteer Role</button>
                                    </div>
                                    <div>
                                        {tempEvent.volunteerRoles.map((role, index) => (
                                            <div key={index} className="flex items-center justify-between">
                                                <p>{role.role}</p>
                                                <p>Required Volunteers: {role.requiredVolunteers}</p>
                                                <button className="bg-[#29b9f0ff] text-white m-1 rounded-md p-1" onClick={() => setTempEvent({ ...tempEvent, volunteerRoles: tempEvent.volunteerRoles.filter((_, i) => i !== index) })}>
                                                    Remove
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div className='w-full flex items-center justify-center'>
                        <button
                            onClick={handleAddEdit}
                            className="m-1 flex items-center bg-[white] hover-bg-[#29b9f0ff] hover-text-[white] text-xl text-[#29b9f0ff] font-bold my-4 py-2 px-4 border-2 border-[#29b9f0ff] rounded whitespace-nowrap"
                        >
                            {type === "volunteer" ? (action === "add" ? "Add Volunteer" : "Edit Volunteer") : (action === "add" ? "Add Event" : "Edit Event")}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddEditDetailsModal;
