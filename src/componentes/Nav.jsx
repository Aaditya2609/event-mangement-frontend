import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function Nav() {
    const location = useLocation();
    return (
        <div className='flex flex-col w-[20%] min-h-[100vh] gap-8 bg-[rgba(0,0,0,0.9)] py-12 px-8 font-bold text-2xl'>
            <NavLink to="/" className={`flex items-center justify-center ${location.pathname === '/'||location.pathname === '/volunteers' ? 'text-[#29b9f0ff]' : ' text-[white]'
                }`}>
                Volunteers
            </NavLink>
            <NavLink to="/events" className={`flex items-center justify-center ${location.pathname === '/events' ? 'text-[#29b9f0ff]' : 'text-[white]'
                }`}>
                Events
            </NavLink>
            <NavLink to="/links" className={`flex items-center justify-center ${location.pathname.includes('/links') ? 'text-[#29b9f0ff]' : ' text-[white]'
                }`}>
                Repo Links
            </NavLink>
        </div>

    )
}

export default Nav