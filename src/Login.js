import { Button } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux';
import { login } from './features/userSlice';
import { auth, provider } from './firebase'
import "./Login.css"

function Login() {

    const dispatch = useDispatch();

    const signIn = () => { //
        auth.signInWithPopup(provider)
            .then(({ user }) => {
                dispatch(login({
                    displayName: user.displayName, // identifying user data that comes back from google
                    email: user.email,
                    photoUrl: user.photoURL
                }))
            }).catch(error => alert(error.message))
    };

    return (
        <div className="login">
            <div className="login__container">
                <img src="https://static.dezeen.com/uploads/2020/10/gmail-google-logo-rebrand-workspace-design_dezeen_2364_col_0.jpg" alt="" />
                <Button
                    onClick={signIn} variant='contained' // allows the user to login onClick
                    color='primary'
                >
                    Login
                </Button>
            </div>
        </div>
    )
}

export default Login