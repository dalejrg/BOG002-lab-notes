import React, {useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import logo from '../assets/mainLogo.svg';
import logoGoogle from '../assets/logo-google.svg';
import backArrow from '../assets/back-arrow.svg';
import '../styles/Register.css'
import "firebase/auth";
import { useFirebaseApp } from 'reactfire';
import firebaseApp from 'firebase/app'

function Register() {
    const history = useHistory();
    const handleClickArrow = () => history.push('/load');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const firebase = useFirebaseApp();

    const submit = () => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCred) => {
            const user = userCred.user
            history.push('./home')
            return user.email
        })
        .catch((error) => {
            console.error(error)
        });
    }

    const authGoogle = () => {
        const googleProvider = new firebaseApp.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(googleProvider)
        .then((userCred) => {
            const user = userCred.user; 
            history.push('./home')
            return user.email
        })
        .catch((error) => {
            console.error(error)
            
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
            <h1 className='createAccount'>CREA TU CUENTA</h1>
            <div className='inputsRegister'>
                <input type="email" className='styleInputs' placeholder='Ingresa tu email' onChange={(event) => setEmail(event.target.value)}/>
                <input type="text" className='styleInputs' placeholder='Decide tu nombre' />
                <input type="password" className='styleInputs' placeholder='Decide tu contraseña' onChange={(event) => setPassword(event.target.value)} />
            </div>
            <div className='btnEnter'>
                <button className='enter' onClick={submit}>INGRESAR AHORA</button>
            </div>
            <div className='spanGoogle'>
                <span className='opcionGoogle'>O registrate con</span>
            </div>
            <div className='iconGoogle'>
                <button className='btnGoogle' onClick={authGoogle}>
                    <img src={logoGoogle} alt='icon google' className='iconlogoGoogle' />
                </button>
            </div>
            <div className='spanLogIn'>
                <span className='opcionLogIn'>¿Ya tienes una cuenta? <Link to='/login'> Ingresa</Link></span>
            </div>
        </div>
    )
}

export default Register;