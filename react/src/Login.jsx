import React from 'react';
import Form from './Form';

export default function Login() {
    return (
        <>
            <Form  isLogin={true} isSignup={false}></Form>
        </>
    );
}
