import ApplicantProject from "./ApplicantProject";
import { useEffect, useState } from 'react';
import axios from 'axios';
import serverUrl from '../../../serveraddress';
import { useSelector } from 'react-redux';

function ApplicantProjectsBlock() {

    const userId = useSelector(state => state.auth.userId);
    const isAuth = useSelector(state => state.auth.isAuth);

    const [applications, setApplications] = useState([]);

    useEffect(()=> {
        if (isAuth) {
            console.log('author effect');
            axios.get(serverUrl+"projects/applicant/"+userId)
                .then(response => {
                    if (response.data.success) {
                        setApplications(response.data.applications);
                        console.log(response.data.applications);
                    }
                });
        }
        
    }, []);

    return (
        <div className="projects small d-flex flex-row wish justify-content-between">
            {applications.length > 0 && 
                applications.map((pr) => <ApplicantProject key={pr.id} application={pr} />)   
            }
            {applications.length == 0 && <h1>Вы не являетесь автором ни одного проекта</h1>}
        </div>
    );
}

export default ApplicantProjectsBlock;