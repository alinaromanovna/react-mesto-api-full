import React from 'react';
import SignForm from './SignForm';
import {Link} from 'react-router-dom';

function Register(props) {
    
    return(
        <main className="enter">
            <SignForm enter={props.onRegister} buttonText="Зарегистрироваться" title="Регистрация" name="register"/>
            <div className="enter__signin">
            <p className="enter__auth-question">Уже зарегистрированы?</p>
            <Link to="/sign-in" className="enter__link">Войти</Link>
            </div>
        </main>
    )
}
export default Register;