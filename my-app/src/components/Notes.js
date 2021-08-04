import React, { useEffect, useState } from 'react';
//import { useHistory } from 'react-router-dom';
import fireConfig, { db} from '../Firebase';
import Home from './Home';
import editLogo from '../assets/icon-edit.svg';
import removeLogo from '../assets/icon-remove.svg';
import '../styles/Home.css'

const Notes = () => {
    //const history=useHistory();
    const [notes, setNotes] = useState([]);
    const [currentId, setCurrentId] = useState('');

    const [userEmail, setUserEmail] = useState({});

    fireConfig.auth().onAuthStateChanged((user) => {
        if (user) {
            setUserEmail(user.email)
        }
    });

    const addOrEditNote = async(noteObject) => {
        if (currentId === '') {
            await db.collection('notes').doc().set(noteObject);
        } else {
                await db.collection('notes').doc(currentId).update(noteObject);
        }
        setCurrentId('')
    }

    const deleteNotes = async (id) => {
        if(window.confirm('¿Pequeño científico, estás seguro de que quieres eliminar esta idea?')) {
            await db.collection('notes').doc(id).delete();
        }
    }

    const getNotes = () => {
        /* if (userEmail === null || undefined || '') {
            history.push('/login')
        } else { */
            db.collection('notes').where('user', '==', userEmail)
            .onSnapshot((querySnapshot) => {
                    const docs = []
                    querySnapshot.forEach(doc => {
                        docs.push({ ...doc.data(), id: doc.id})
                    })
                    setNotes(docs)
                });
        //}
    }
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    }, [userEmail])

    return (
        <div>
            <div>
                <Home {...{addOrEditNote, currentId, notes, userEmail}} />
            </div>
            <div>
                {notes.map(note => (
                    <div className='noteContainerAdd' key={note.id}>
                        <div className='noteAdd'>
                            <div className='descriptionNote'>{note.description}</div>
                        </div>
                        <div>
                            
                            <button className='btnEdit'>
                                <img src={editLogo} alt='edit icon' className='logoEdit' onClick={() => setCurrentId(note.id)} />
                            </button>
                            <button className='btnRemove'>
                                <img src={removeLogo} alt='remove icon' className='logoRemove' onClick={() => deleteNotes(note.id)}/>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Notes;