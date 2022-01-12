import React from 'react';
import SignForm from './SignForm';

function Login(props) {
    return (
        <main className="enter">
            <SignForm enter={props.onLogin} buttonText="Войти" title="Вход" name="login"/>
        </main>
    )
}
export default Login;