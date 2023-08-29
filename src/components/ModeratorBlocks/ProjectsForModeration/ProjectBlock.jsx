import { Link, useNavigate } from "react-router-dom";
import settings from '../../../assets/images/icons/settings.svg'
import serverURL from "../../../serveraddress";

export default function ProjectBlock({project, index}) {

    console.log(project);
    const str = project.author.surname + " " + project.author.name.slice(0.1) + "." + (project.author.patronymic ? " " + project.author.patronymic + "., " : ", ") + project.author.job + " " + (project.author.structure[0].abbreviation ? project.author.structure[0].abbreviation : project.author.structure[0].decoding);

    let date = new Date(project.created_date);
    date = (date.getDate() < 10 ? "0"+date.getDate() : date.getDate()) + "."+(date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth()) + "." +date.getFullYear();

    const navigate = useNavigate();

    return (
        <div className="project" style={{width: "33%"}}>
            <div className="img"  onClick={() => navigate("/project/"+project.id)} style={{backgroundImage: "url("+serverURL + "uploads/"+project.main_photo.path+")"}}></div>
            <div className="info">
                <h3  onClick={() => navigate("/project/"+project.id)}>{project.name}</h3>
                <p className="author"><Link to={"/profile/"+project.author_id}>{str}</Link></p>
                
                <div className="btns d-flex justify-content-between align-items-center">
                    <div>
                        <span>{date}</span>
                        <span className="ml-2rem">Модерация №{project.moderations_count+1}</span>
                    </div>
                    <img src={settings} alt="" />
                </div>
            </div>
            <div className="category">
                <img src={serverURL+"uploads/"+project.theme[project.theme.length - 1].path} alt="" />
            </div>
        </div>
    )
}