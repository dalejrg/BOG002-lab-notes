import React from 'react';
import {useHistory} from 'react-router-dom'
import mainLogo from '../assets/mainLogo.svg';
import logoutLogo from '../assets/logo-logout.svg';
import sendLogo from '../assets/send-logo.svg';
import "firebase/auth";
import { useFirebaseApp} from 'reactfire';
import '../styles/Home.css';

function Home() {
    const history = useHistory();
    const firebase = useFirebaseApp();

    const logout = () => {
        firebase.auth().signOut()
        .then(() => {
            history.push('./load')
        })
    }

    return(
    <div>
        <section className='headerHome'>
            <div className='imgLogoLab'>
                <img src={mainLogo} alt='logo principal' className='mainLogoHome'/>
            </div>
            <div className='logoutLogo'>
                <button className='btnLogout' onClick={logout}>
                    <img src={logoutLogo} alt='logo cerrar sesión' className='imgLogoutLogo' />
                </button>
            </div>
        </section>
        <section className='note'>
            <div className='noteContainer'>
                <textarea placeholder='Escribe aquí tus ideas...' className='textNote'></textarea>
                <button className='btnSend'>
                    <img src={sendLogo} alt='icono enviar' className='sendIcon' />
                </button>
            </div>
        </section>
    </div>
    )
}

export default Home;