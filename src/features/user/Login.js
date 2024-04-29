import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LandingIntro from './LandingIntro'
import ErrorText from '../../components/Typography/ErrorText'
import InputText from '../../components/Input/InputText'
import axios from 'axios'
import { jwtDecode } from "jwt-decode";



function Login() {

    const INITIAL_LOGIN_OBJ = {
        password: "",
        emailId: ""
    }

    const [loading, setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState("")
    const [loginObj, setLoginObj] = useState(INITIAL_LOGIN_OBJ)


    const submitForm = async (e) => {
        e.preventDefault();
        setErrorMessage('');

        if (loginObj.emailId.trim() === '') return setErrorMessage('Email Id is required! (use any value)');
        if (loginObj.password.trim() === '') return setErrorMessage('Password is required! (use any value)');

        try {
            setLoading(true);
            const response = await fetch('http://localhost:9005/public/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: loginObj.emailId,
                    password: loginObj.password,
                }),
            });
            const responseData = await response.json();
            const token = responseData.token;
            const decoded = jwtDecode(token);
            localStorage.setItem('token', responseData.token);
            localStorage.setItem('grupo', decoded.role[0]);
            localStorage.setItem('login', loginObj.emailId);
            window.location.href = '/app/welcome';
            setLoading(false);

        } catch (error) {
            setLoading(false);
            // Manipule o erro da requisição aqui
            console.error('Erro ao fazer login:', error);
            setErrorMessage('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    const updateFormValue = ({ updateType, value }) => {
        setErrorMessage("")
        setLoginObj({ ...loginObj, [updateType]: value })
    }

    return (
        <div className="min-h-screen bg-base-200 flex items-center">
            <div className="card mx-auto w-full max-w-5xl  shadow-xl">
                <div className="grid  md:grid-cols-2 grid-cols-1  bg-base-100 rounded-xl">
                    <div className=''>
                        <LandingIntro />
                    </div>
                    <div className='py-24 px-10'>
                        <h2 className='text-2xl font-semibold mb-2 text-center'>Login</h2>
                        <form onSubmit={(e) => submitForm(e)}>

                            <div className="mb-4">

                                <InputText type="emailId" defaultValue={loginObj.emailId} updateType="emailId" containerStyle="mt-4" labelTitle="Usuario" updateFormValue={updateFormValue} />

                                <InputText defaultValue={loginObj.password} type="password" updateType="password" containerStyle="mt-4" labelTitle="Senha" updateFormValue={updateFormValue} />

                            </div>

                            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
                            <button type="submit" className={"btn mt-2 w-full btn-primary" + (loading ? " loading" : "")}>Login</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login