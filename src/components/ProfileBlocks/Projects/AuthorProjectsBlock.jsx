import { useEffect, useState } from 'react';
import AuthorProject from './AuthorProject';
import axios from 'axios';
import serverUrl from '../../../serveraddress';
import { useSelector } from 'react-redux';

function AuthorProjectsBlock() {

    const userId = useSelector(state => state.auth.userId);
    const isAuth = useSelector(state => state.auth.isAuth);

    const [projects, setProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [sec, setSec] = useState(0);
    useEffect(()=> {
        if (isAuth) {
            console.log('author effect');
            axios.get(serverUrl+"projects/author/"+userId)
                .then(response => {
                    if (response.data.success) {
                        setProjects(response.data.projects);
                        setAllProjects(response.data.projects);
                        console.log(response.data);
                    }
                });
        }
        
    }, []);
    
    const changeSec = (i) => {
        setSec(i);
        if (i == 1)
            setProjects(allProjects.filter(p => p.status_id == 3));
        else if (i == 2) {
            setProjects(allProjects.filter(p => p.status_id != 3));
        }
        else {
            setProjects(allProjects);
        }
    }

    return (
        <>
            <nav className="profile_menu small d-flex flex-row justify-content-start align-items-center mt-3">
                <a className={sec == 0 ? "active" : ""} onClick={() => changeSec(0)} >Все</a>
                <a className={sec == 1 ? "active ml-2rem" : "ml-2rem"} onClick={() => changeSec(1)} >Опубликованные</a>
                <a className={sec == 2 ? "active ml-2rem" : "ml-2rem"} onClick={() => changeSec(2)} >Неопубликованные</a>
            </nav>
            <div className="projects small org d-flex justify-content-between">
                {projects.length > 0 && 
                    projects.map((pr) => <AuthorProject key={pr.id} project={pr} />)   
                }
                {projects.length == 0 && <h1>Вы не являетесь автором ни одного проекта</h1>}
            </div>
        </>
    );
}

export default AuthorProjectsBlock