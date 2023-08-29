import { useState } from "react";
import ProjectsMenu from "./Projects/ProjectsMenu";
import AuthorProjectsBlock from "./Projects/AuthorProjectsBlock";
import MemberProjectsBlock from "./Projects/MemberProjectsBlock";
import ApplicantProjectsBlock from './Projects/ApplicantProjectsBlock';
import { useContext } from "react";
import { useSelector } from "react-redux";
import { ProfileContext } from '../../pages/Profile';
function ProjectBlock({isNew}) {


    console.log('projectblock');
    const [proSection, setProSection] = useState("org");
    const { profileId } = useContext(ProfileContext);

    
    const userId = useSelector(state => state.auth.userId);
    const isAuth = useSelector(state => state.auth.isAuth);

    if (profileId !== userId) {
        return <h1>Страница не найдена</h1>
    }
    return (
        <section className="projects toggle">

            <ProjectsMenu sec={proSection} changeSec={setProSection} isNewA={isNew}/>

            {
                proSection === "org" &&
                <AuthorProjectsBlock />
            }

            {
                proSection === "part" && 
                <MemberProjectsBlock />
            }
            {
                proSection === "wish" && 
                <ApplicantProjectsBlock />
            }
        </section>
    );
}

export default ProjectBlock;