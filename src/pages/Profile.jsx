import Header from '../components/Header';
import Footer from '../components/Footer';
import '../assets/style/user.css';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import UserBlock from '../components/ProfileBlocks/UserBlock';
import ProjectBlock from '../components/ProfileBlocks/ProjectBlock';
import ProfileMenu from '../components/ProfileBlocks/ProfileMenu';
import PageNotFound from './PageNotFound';
import ApplicationBlock from '../components/ProfileBlocks/ApplicationBlock';
import axios from "axios";
import serverURL from "../serveraddress";
import { useLocation, useNavigate } from 'react-router-dom';
import { createContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import FlyAlert from '../components/FlyAlert';
export const ProfileContext = createContext("");

function Profile({sec}) {

    const [searchParams, setSearchParams] = useSearchParams();
    const url_message = searchParams.get("message");

    const userId = useSelector(state => state.auth.userId);
    const role = useSelector(state => state.auth.role);


    const [profileId, setProfileId] = useState(parseInt(useLocation().pathname.split("/")[2]));

    const [isNewAnswers, setIsNewAnswers] = useState(false);
    useEffect(() => {
        axios.get(serverURL + "projects/applicant/isNew/"+userId)
        .then(response => {
            if (response.data.success === true) {
                console.log('новых ответов ' + response.data.count);
                if (response.data.count > 0) {
                    setIsNewAnswers(true);
                }
            }
            else {
                console.log(response.data)
            }
        });
    }, []);
    const [section, setSection] = useState(sec);
    const navigate = useNavigate();
    const deleteUrlMessage = () => {
        navigate("/profile/"+userId);
    }

    
    console.log("role " + role + " section " + section);

    return(
        
        <>
            < Header />
            <ProfileContext.Provider value={{ profileId }} >
            <main>
                <div className="container">
                    {url_message && url_message === "created" && <FlyAlert text="Проект успешно создан! Скоро его проверит модератор. Для отслеживания состояния проекта зайдите в раздел Проекты" setSended={deleteUrlMessage} />}
                    {url_message && url_message === "edited" && <FlyAlert text="Проект успешно изменен!" setSended={deleteUrlMessage} />}

                    {profileId === userId && <ProfileMenu sec={section} setSec={setSection} isNew={isNewAnswers} changeIsNew={setIsNewAnswers}/>}
                    {
                        section === "user" &&
                        <UserBlock />
                    }
                    {
                        role == 1 && section === "projects" &&
                        <ProjectBlock isNew={isNewAnswers} />
                    }
                    {
                        role == 1 && section === "queries" &&
                        <ApplicationBlock />
                    }
                </div>
            </main>
            </ProfileContext.Provider>
            <Footer />
        </>
    ); 
}

export default Profile;