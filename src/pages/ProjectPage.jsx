import { useLocation } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';
import { useEffect } from "react";
import serverURL from "../serveraddress";
import axios from "axios";
import ProjectBanner from "../components/ProjectPresentationBlocks/ProjectBanner";
import { useState } from 'react';
import ProjectIdea from "../components/ProjectPresentationBlocks/ProjectIdea";
import "../assets/style/project.css";
import ProjectAboutAuthor from "../components/ProjectPresentationBlocks/ProjectAboutAuthor";
import ProjectWhoNeed from "../components/ProjectPresentationBlocks/ProjectWhoNeed";
import ProjectMembers from "../components/ProjectPresentationBlocks/ProjectMembers";
import ProjectGoals from "../components/ProjectPresentationBlocks/ProjectGoals";
import SendingQueryBlock from "../components/SendingQueryBlock";
import FlyAlert from '../components/FlyAlert';
import CustomAlert from '../components/CustomAlert';
import { useSelector } from "react-redux";
import End from "../components/ProjectPresentationBlocks/End";
function ProjectPage() {
    const isAuth = useSelector(state => state.auth.isAuth);
    const userId = useSelector(state => state.auth.userId);

    let urls = useLocation().pathname.split("/");
    let id = parseInt(urls[2]);

    const [project, setProject] = useState({});
    const [wasLoaded, setWasLoaded] = useState(false);
    const [isSended, setSended] = useState(false);
    const [isSendingQuery, setIsSendingQuery] = useState(false);


    useEffect(() => {
        axios.get(serverURL+"projects/"+id).then(response => {
            if (response.data.success === true) {
                setProject(response.data.project);
                setWasLoaded(true);
                console.log(response.data);
                if (response.data.project.author_id != userId && isAuth) {
                    axios.post(serverURL+"project/addview", {project_id: id, user_id: userId})
                    .then(response => {
                        console.log(response.data);
                    });
                }
            }
        });
        
    }, []);

    const isItMember = () => {
        return project.members.map(m => m.id).includes(userId);
    }

    return (
       <>
        <Header />
            {wasLoaded && <main>
                <ProjectBanner project={project} openQuery={setIsSendingQuery} />
                <div className='container'>
                    <ProjectIdea project={project} />
                    <ProjectAboutAuthor project={project} />
                    <section className="d-flex justify-content-between align-items-center">
                        <ProjectWhoNeed searchingFor={project.searchingFor} />
                        {project.members.length > 0 && <ProjectMembers members={project.members}  openQuery={setIsSendingQuery} />} 
                    </section>
                    <ProjectGoals goals={project.goals} />
                    <End  project={project} openQuery={setIsSendingQuery} />
                </div>
            </main>}

            {
                isSendingQuery && isAuth && userId !== project.author_id && !isItMember() && < SendingQueryBlock project={project} openQuery={setIsSendingQuery} setSended={setSended} />
            }
            {/* без авторизации */}
            {
                isSendingQuery && !isAuth && < CustomAlert text="Необходимо войти, чтобы подать заявку" close={setIsSendingQuery} />
            }
            {/* это проект автора */}
            {
                isSendingQuery && userId == project.author_id && < CustomAlert text="Вы не можете подать заявку на собственный проект" close={setIsSendingQuery} />
            }
            {/* пользователь уже участвует в этом проекте */}
            {
                isSendingQuery && isItMember() && < CustomAlert text="Вы не можете подать заявку, так как уже являетесь участником проекта" close={setIsSendingQuery} />
            }
            {
                isSended && <FlyAlert text={"Заявка успешно отправлена"} setSended = {setSended} />
            }
        <Footer />
       </>
    );
}
export default ProjectPage;