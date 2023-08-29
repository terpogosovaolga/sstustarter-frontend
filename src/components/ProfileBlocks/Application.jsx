import briefcase from '../../assets/images/icons/briefcase.svg';
import arrowright2 from '../../assets/images/icons/arrowright2.svg';
import check from '../../assets/images/icons/check.svg';
import closesquare from '../../assets/images/icons/closesquare.svg';
import serverURL from '../../serveraddress';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Application({application}) {

    const navigate = useNavigate();

    const [isOpenContacts, setIsOpenContacts] = useState(false);
    const colors = ["", "", "color-grey", "color-green", "color-red"];
    const [status, setStatus] = useState(application.appstatus);


    const seen = () => {
        axios.post(serverURL + "application/status", {
            application_id: application.id,
            appstatus_id: 2
        })
    }
    if (status.id == 1) {
        seen(2);
    }

    const changeStatus = (new_status) => {
        axios.post(serverURL + "application/status", {
            application_id: application.id,
            appstatus_id: new_status
        })
        .then(response => {
            if (response.data.success === true) {
                setStatus(response.data.appstatus);
            }
        });

        if (new_status == 3) {
            axios.post(serverURL+"applications/member", {project_id: application.project_id, application_id: application.id, user_id: application.user_id}).then();
        }
    }


    return (
        <div className="query mt-5">
            <div className="top d-flex flex-row justify-content-start align-items-stretch" style={{position: "relative"}}>
                <div className="pic" style={{backgroundImage: "url("+serverURL + "uploads/"+( application.user.avatar_path ? application.user.avatar_path : "defaultuser.svg" )+")"}}  onClick={() => navigate("/profile/"+application.user.id)}></div>
                <div className="d-flex flex-column align-items-start justify-content-between h100"  onClick={() => navigate("/profile/"+application.user.id)}>
                    <h5 >{application.user.surname + " " + application.user.name  + " " + (application.user.patronymic ? application.user.patronymic : "")}</h5>
                    <div className="jobs d-flex justify-content-start align-items-center">
                        <div className="job d-flex align-items-center">
                            <img src={briefcase} alt="" />
                            <span className="ml-1rem">{application.user.job}</span>
                        </div>
                        <div className="place ml-2rem">{application.user.structure[0].abbreviation ? application.user.structure[0].abbreviation : application.user.structure[0].decoding}</div>
                    </div>
                </div>
                { status === 1 && 
                <div className="new d-flex align-items-center">
                    новые заявки
                </div>}
                {
                    status !== 1 && 
                    <div className={'status d-flex align-items-center ' + colors[status.id]}>
                        {"заявка " + status.name.toLowerCase()}
                    </div>
                }
             </div>
             <div className="info mt-15rem">
                <p className="project d-flex justify-content-between align-items-center"style={{fontWeight: 600}} onClick={() => navigate("/project/"+application.project.id)}><span>Проект: {application.project.name}</span> <img className="more" src={arrowright2} alt="" /></p>
                <p className="message"> <span className="color-black">{application.user.name}: </span> {application.message} </p>
                <span className="date">{application.date}</span>
                <div className="bottom mt-3 d-flex justify-content-between align-items-center">
                    <div className='contacts' onClick={() => setIsOpenContacts(!isOpenContacts)}>{!isOpenContacts ? "Показать контакты" : "Скрыть контакты"}</div>

                    {isOpenContacts && <div className='d-flex flex-column align-items-start justify-content-center'>
                        <p>{application.phone}</p>
                        <p>{application.email}</p>
                    </div>}
                    {
                        status.id < 3 &&
                        <div className="btns d-flex justify-content-end align-items-center">
                        <img className="yes mr-1rem" src={check} alt="" onClick={() => changeStatus(3)}/>
                        <img className="no" src={closesquare} alt="" onClick={() => changeStatus(4)} />
                    </div>}
                </div>
             </div>
        </div>
    );
}

export default Application;