import React from 'react';
import { useHistory } from 'react-router-dom';
import mainLoad from '../assets/load.svg';
import '../styles/Load.css';

function Load() {
    const history = useHistory();
    const handleClickRegister = () => history.push('/register');
    const handleClickLogIn = () => history.push('/login');
    return (
        <div className='centerElem'>
            <div className='containerImg'>
                <img src={mainLoad} alt="logo loading" className="loadingLogo" />
            </div>
            <div className='mainBtns'>
                <button className='btnRegister' onClick={handleClickRegister}>CREA TU CUENTA</button>
                <button className='btnLogIn' onClick={handleClickLogIn}>INICIA SESIÓN</button>
            </div>
        </div>
    );
}

export default Load;