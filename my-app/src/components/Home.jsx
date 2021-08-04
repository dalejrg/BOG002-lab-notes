import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import mainLogo from '../assets/mainLogo.svg';
import logoutLogo from '../assets/logo-logout.svg';
import sendLogo from '../assets/send-logo.svg';
import fireConfig from '../Firebase';
import { db } from '../Firebase';
import '../styles/Home.css';

function Home(props) {
    const history = useHistory();
    const initialStateValue = {
        user: props.userEmail,
        description: '',
    }
//console.log(fireConfig.auth().currentUser.email)

    const [values, setValues] = useState(initialStateValue)
    const handleDescriptionChange = (e) => {
        const {name, value} = e.target;
        setValues({...values, [name]:value})
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        props.addOrEditNote(values);
        setValues({...initialStateValue})
    }

    const logout = () => {
        fireConfig.auth().signOut()
        .then(() => {
            history.push('/')
        })
    }

    const getNotesId = async(id) => {
        const doc = await db.collection('notes').doc(id).get();
        setValues({...doc.data()})
    }

    useEffect(() => {
        if(props.currentId === '') {
            setValues({ ...initialStateValue});
        } else {
            getNotesId(props.currentId)
        }
       // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [props.currentId])

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
        <section className='note' >
            <div className='noteContainer' >
                <textarea placeholder='Escribe aquí tus ideas...' className='textNote' name="description" onChange={handleDescriptionChange} value={values.description}></textarea>
                <button type='submit' className='btnSend' onClick={handleSubmit}>
                    <img src={sendLogo} alt='icono enviar' className='sendIcon' />
                </button>
            </div>
        </section>
    </div>
    )
}

export default Home;