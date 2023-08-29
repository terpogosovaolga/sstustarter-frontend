import calendar from "../../../assets/images/icons/calendar.svg";
import user from '../../../assets/images/icons/user.svg';
import arrow from '../../../assets/images/icons/arrowright2.svg';
import serverURL from "../../../serveraddress";
import { Link } from "react-router-dom";
function BigProjectBlock({ classLR, project }) {
    let image = serverURL+"uploads/"+project.main_photo.path;
    let date = new Date(project.plandate_step_end);
    return (
        <div className={"project " + classLR} style={{backgroundImage:  "url("+image+")"}}>
                <div className="info">
                    <p className="views_count"><span>{project.views}</span> просмотров</p>
                    <p className="date"><img src={calendar} alt="" /> <span>до {date.getDate() + "." + date.getMonth() + "." + date.getFullYear()}</span></p>
                    <h3>{project.name}</h3>
                    <p className="author"><img src={user} alt="" /> <a>{project.author.name + " " + project.author.surname} </a></p>
                    <p className="description">{project.idea_text.substr(0, 75)+"..."}</p>

                    <img className="category" src={serverURL+"uploads/"+project.theme[project.theme.length - 1].path} alt="" />
                    <Link to={"/project/"+project.id}><img className="more" src={arrow} alt="" /></Link> 
                </div>
            </div>
    );
}

export default BigProjectBlock;