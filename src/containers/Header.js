import { themeChange } from 'theme-change'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import BellIcon from '@heroicons/react/24/outline/BellIcon'
import Bars3Icon from '@heroicons/react/24/outline/Bars3Icon'
import MoonIcon from '@heroicons/react/24/outline/MoonIcon'
import SunIcon from '@heroicons/react/24/outline/SunIcon'
import { openRightDrawer } from '../features/common/rightDrawerSlice';
import { RIGHT_DRAWER_TYPES } from '../utils/globalConstantUtil'

import { NavLink, Routes, Link, useLocation } from 'react-router-dom'


function Header() {

    const dispatch = useDispatch()
    const { noOfNotifications, pageTitle } = useSelector(state => state.header)
    const [currentTheme] = useState("light");
    const [imagem, setImagem] = useState(null);
    const [loading, setLoading] = useState(true);
    const login = localStorage.getItem('login');


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:9005/public/users/${login}`);
                const result = await response.json();
                console.log(result.imagem);
                setImagem(result.imagem);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [login]);



    // Opening right sidebar for notification
    const openNotification = () => {
        dispatch(openRightDrawer({ header: "Notifications", bodyType: RIGHT_DRAWER_TYPES.NOTIFICATION }))
    }


    function logoutUser() {
        localStorage.clear();
        window.location.href = '/'
    }

    return (
        // navbar fixed  flex-none justify-between bg-base-300  z-10 shadow-md

        <>
            <div className="navbar sticky top-0 bg-base-100  z-10 shadow-md ">


                {/* Menu toogle for mobile view or small screen */}
                <div className="flex-1">
                    <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
                        <Bars3Icon className="h-5 inline-block w-5" /></label>
                    <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
                </div>



                <div className="flex-none ">



                    {/* Profile icon, opening menu on click */}
                    <div className="dropdown dropdown-end ml-4">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img src={imagem || 'https://daniel-estudos-app.s3.us-east-2.amazonaws.com/usersPadrao.png'} alt="profile" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            <li className="justify-between">
                                <Link to={'/app/settings-profile'}>
                                    Settings
                                    <span className="badge">New</span>
                                </Link>
                            </li>

                            <div className="divider mt-0 mb-0"></div>
                            <li><a onClick={logoutUser}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Header