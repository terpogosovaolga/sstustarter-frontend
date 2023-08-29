import axios from 'axios';
import Application from './Application';
import serverURL from '../../serveraddress';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { ProfileContext } from '../../pages/Profile';
function ApplicationBlock() {

    const userId = useSelector(state => state.auth.userId);
    const isAuth = useSelector(state => state.auth.isAuth);
    
    const { profileId } = useContext(ProfileContext);


    const [applications, setApplications] = useState([]);

    useEffect(() => {
        if (isAuth) {
            console.log(userId);
            axios
                .get(serverURL+"applications/author/"+userId)
                .then((response) => {
                    if (response.data.success === true) {
                        setApplications(response.data.applications);
                    }
                    else {
                        console.log(response.data.message);
                    }
                });
        }
        
    }, []);

    if (userId !== profileId) {
        return <h1>Страница не найдена</h1>
    }
    return (
        <section className="queries toggle">
           { applications.length !=0 && <div className="queries d-flex justify-content-between align-items-stretch wrap">
                {
                    applications.map((app) => <Application  key ={app.id} application={app}/>)
                }
            </div>}
            {
                applications.length == 0 && 
                <h1>Заявок нет</h1>
            }
        </section>
    );
}

export default ApplicationBlock;