import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useGetUserProfileQuery } from './services/auth';
import { setLoggedInUser } from './features/auth/authSlice';
import { useNavigate } from "react-router-dom";

import Cookies from 'js-cookie';
export default function Profile() {
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = Cookies.get('jwtToken');

    const { data, isLoading, isError, isSuccess } = useGetUserProfileQuery(token);
    useEffect(() => {
    }, []);

    const userLogout = () => {
        let response = Cookies.remove('jwtToken');
        let jwt = Cookies.get('jwtToken');
        console.log(jwt);
        dispatch(setLoggedInUser({}));
        navigate("/");


    }


    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error fetching user profile</div>;

    return (
        <>
            <h1>User Profile</h1>
            {isSuccess && (
                <div>
                    <p>Name: {data.user.name}</p>
                    <p>Email: {data.user.email}</p>
                </div>
            )}

            <button className='btn btn-dark' onClick={userLogout}>Logout</button>
        </>
    );
}
