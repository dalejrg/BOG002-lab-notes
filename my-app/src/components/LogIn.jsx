import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/mainLogo.svg';
import logoGoogle from '../assets/logo-google.svg';
import backArrow from '../assets/back-arrow.svg'
import '../styles/Login.css'
import firebaseApp from 'firebase/app';
import fireConfig from '../Firebase';

function LogIn() {
    const history = useHistory();
    const handleClickArrow = () => history.push('/');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const logIn = () => {
        fireConfig
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCred) => {
            const user = userCred.user;
            history.push('./home')
            return user.email;
        })
        .catch((err) => {
            console.log(err.code);
            console.log(err.message);      
            }
        );

    }
    const authGoogle = () => {
        const googleProvider = new firebaseApp.auth.GoogleAuthProvider();
        fireConfig
        .auth().signInWithPopup(googleProvider)
        .then((userCred) => {
            const user = userCred.user;
            history.push('./home')
            return user.email;
        })
        .catch((err) => {
            console.log(err.code);
            console.log(err.message);
        });
    }

    return (
        <div>
            <div>
                <img src={logo} alt='main logo' className='mainLogo' />
                <button className='back' onClick={handleClickArrow}>
                    <img src={backArrow} alt='back arrow' className='btnBack' />
                </button>
            </div>
            <h1 className='createAccount'>INICIA SESIÓN</h1>
            <div className='inputsRegister'>
                <input type="email" className='styleInputs' placeholder='Ingresa tu email' value= {email} onChange={(event) => setEmail(event.target.value)} />
                <input type="password" className='styleInputs' placeholder='Ingresa tu contraseña' value={password} onChange={(event) => setPassword(event.target.value)}/>
            </div>
            <div className='forgotPassword'>
                <span>¿Olvidaste tu contraseña? Consigue una nueva</span>
            </div>
            <div className='btnEnter'>
                <button className='enter' onClick={logIn}>INGRESAR AHORA</button>
            </div>
            <div className='spanGoogle'>
                <span className='opcionGoogle'>O ingresa con</span>
            </div>
            <div className='iconGoogle'>
                <button className='btnGoogle' onClick={authGoogle}>
                    <img src={logoGoogle} alt='icon google' className='iconlogoGoogle' />
                </button>
            </div>
            <div className='spanLogIn'>
                <span className='opcionLogIn'>¿No tienes una cuenta? <Link to='/register'> Creala</Link></span>
            </div>
        </div>
    )
}

export default LogIn;
