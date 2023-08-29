
import { useNavigate } from 'react-router-dom';
import arrowleft from '../../assets/images/icons/arrowleft.png';
import calendar from '../../assets/images/icons/calendar.svg';
import serverURL from '../../serveraddress';
function ProjectBanner({project, openQuery}) {

    const navigate = useNavigate();
 
    const back = () => {
        navigate(-1);
        console.log('back');
    }

    return (
        <div className="projectImage" style={{backgroundImage: "url("+serverURL+"uploads/"+project.main_photo.path+")"}}>
            <div className="container h-100">
                <span className="back" onClick={back}> 
                    <img src={arrowleft} alt="" />    
                </span>
                <div className="info">
                    <h1>{project.name}</h1>
                    <div className="d-flex justify-content-between align-items-stretch">
                        <div className="attrs h-100">
                            <p className="date"> <img src={calendar} alt="" /> <span>до {new Date(project.plandate_step_end).getDate() + ":" + ((new Date(project.plandate_step_end).getMonth()+1) < 10 ? "0" + (new Date(project.plandate_step_end).getMonth()+1) : (new Date(project.plandate_step_end).getMonth()+1)) + ":" + new Date(project.plandate_step_end).getFullYear()}</span> </p>
                            <p className="people"> <span className="color-blue">{project.membersCount}</span> из {project.members_goal} человек набрано</p>
                        </div>
                        <div className="author d-flex justify-content-between align-items-stretch h-100" onClick={() => navigate("/profile/"+project.author.id)}>
                            <div className="name">
                                <h5>{project.author.surname +" " + project.author.name + " " + (project.author.patronymic ? project.author.patronymic : "")}</h5>
                                <p>{project.author.job}</p>
                            </div>
                            <img src={serverURL + "uploads/"+(project.author.avatar_path ? project.author.avatar_path : "defaultuser.svg")} alt="" />
                        </div>
                    </div>
                    <div className="theme">
                        {project.theme.slice(0).reverse().map((t, i) => t.name +   ( i == project.theme.length - 1 ? "" : " / "))}
                    </div>
                    <div className="create_btn" onClick={() => openQuery(true)}>Подать заявку</div>
                </div>
            </div>
        </div>
    );
}

export default ProjectBanner