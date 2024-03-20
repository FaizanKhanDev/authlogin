import React, { useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle, faUser, faLock, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom'; 
import { useUserLoginRTQMutation, useCreateNewUserAccountMutation } from './services/auth'; 
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedInUser } from './features/auth/authSlice';
export default function Form(props) {
    const { isSignup, isLogin } = props;
    const [showPassword, setShowPassword] = useState(false);
    const [userEmail, setUserEmail] = useState('')
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [userConfirmPassword, setUserConfirmPassword] = useState('')
    const [message, setMessage] = useState('')
    const [userLoginRTQ, { isLoading, isError, isSuccess }] = useUserLoginRTQMutation();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [createNewUserAccount, { isLoading: isCreatingAccount, isError: accountCreationError, isSuccess: accountCreationSuccess }] = useCreateNewUserAccountMutation();

    // Toggle password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // User Registration
    const createAccount = async () => {
        try {
            if(userPassword != userConfirmPassword){
                setMessage("Passwords do not match")
                return
            }
            let response = await createNewUserAccount({ name: userName, email: userEmail, password: userPassword, password_confirmation: userConfirmPassword })
            console.log(response.data.status);
            setMessage(response.data.message)
            if (response.data.status == "failed") {
                setMessage(response.data.message)
                return
            }
            setTimeout(() => {
                setMessage('')
                navigate("/");
            }, 2000);
        } catch (error) {
            console.log(error)
        }


    }

    // User Login
    const userLogin = async () => {
        let response = await userLoginRTQ({ email: userEmail, password: userPassword })
        console.log(response.data.status);
        if (response.data.status == "failed") {
            setMessage(response.data.message)
        } 
        if (response.data.status == "success") {
            setMessage(response.data.message)
            const token = response.data.token;
            // Dispatch an action with the token
           dispatch(setLoggedInUser({ token }));

            setTimeout(() => {
                navigate("/profile");
            }, 1000)

        }



    }
    return (

        <div className="container">
            <div className="form-box d-flex align-item-center">
                {
                    message && <div className="alert alert-success text-center">{message}</div>
                }
                <div className="header-form">
                    <h4 className="text-primary text-center">
                        <FontAwesomeIcon icon={faUserCircle} style={{ fontSize: "110px" }}></FontAwesomeIcon>
                    </h4>
                </div>
                <div className="body-form">
                    <form>
                        {
                            !isLogin && (
                                <div className="input-group mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text">
                                            <FontAwesomeIcon icon={faUser} style={{ fontSize: "25px" }}></FontAwesomeIcon>
                                        </span>
                                    </div>
                                    <input
                                        value={userName}
                                        onChange={(e) => setUserName(e.target.value)}
                                        type="text" className="form-control" placeholder="Name" />
                                </div>

                            )
                        }

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faUser} style={{ fontSize: "25px" }}></FontAwesomeIcon>
                                </span>
                            </div>
                            <input
                                value={userEmail}
                                onChange={(e) => setUserEmail(e.target.value)}
                                type="text" className="form-control" placeholder="Email" />
                        </div>

                        <div className="input-group mb-3">
                            <div className="input-group-prepend">
                                <span className="input-group-text">
                                    <FontAwesomeIcon icon={faLock} style={{ fontSize: "25px" }}></FontAwesomeIcon>
                                </span>
                            </div>
                            <input
                                onChange={(e) => setUserPassword(e.target.value)}
                                value={userPassword}
                                type={showPassword ? "text" : "password"}
                                className="form-control"
                                placeholder="Password"
                            />
                            <div className="input-group-append">
                                <span className="eye-icon">
                                    <FontAwesomeIcon
                                        icon={showPassword ? faEyeSlash : faEye}
                                        style={{ cursor: 'pointer' }}
                                        onClick={togglePasswordVisibility}
                                    />
                                </span>
                            </div>
                        </div>

                        {isSignup && (
                            <div className="input-group mb-3">
                                <div className="input-group-prepend">
                                    <span className="input-group-text">
                                        <FontAwesomeIcon icon={faLock} style={{ fontSize: "25px" }}></FontAwesomeIcon>
                                    </span>
                                </div>
                                <input
                                    onChange={(e) => setUserConfirmPassword(e.target.value)}

                                    value={userConfirmPassword}
                                    type={showPassword ? "text" : "password"} className="form-control" placeholder="Confirm Password" />
                                <div className="input-group-append">
                                    <span className="eye-icon">
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEyeSlash : faEye}
                                            style={{ cursor: 'pointer' }}
                                            onClick={togglePasswordVisibility}
                                        />
                                    </span>
                                </div>
                            </div>
                        )}

                        <br />
                        <p className='text-center'>
                            <button type="button"
                                onClick={isSignup ? createAccount : userLogin}

                                className="btn btn-primary btn-block">
                                {isSignup ? "Sign Up" : "Login"}
                            </button>

                        </p>

                    </form>
                    {
                        isLogin && (
                            <p className="text-center text-white">Don't have an account? <Link to="/signup">Sign Up</Link></p>
                        )
                    }
                    {
                        isSignup && (
                            <p className="text-center text-white">Already have an account? <Link to="/">Login</Link></p>
                        )
                    }
                </div>
            </div>
        </div>
    );
}
