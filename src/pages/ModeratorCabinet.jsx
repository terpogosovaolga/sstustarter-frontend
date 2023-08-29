import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
import ModeratorMenu from '../components/ModeratorBlocks/ModeratorMenu';
import ProjectsForModerationBlock from "../components/ModeratorBlocks/ProjectsForModerationBlock";
import '../assets/style/moderator.css';
import HistoryOfModerationsBlock from "../components/ModeratorBlocks/HistoryOfModerationsBlock";

export default function ModeratorCabinet() {
    
    const [section, setSection] = useState(0);
    return (
        <>
        < Header />
        <main>
            <div className="container">
                <section className="adminpanel">
                    <ModeratorMenu sec={section} setSec={setSection}/>

                    {
                        section === 0 && 
                        <ProjectsForModerationBlock />
                    }

                    {
                        section === 1 && 
                        <HistoryOfModerationsBlock />
                    }

                </section>
            </div>
        </main>
        <Footer />
        </>
    );
}

