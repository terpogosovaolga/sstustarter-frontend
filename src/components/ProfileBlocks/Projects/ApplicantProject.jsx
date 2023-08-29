import serverURL from "../../../serveraddress";
import user  from "../../../assets/images/icons/user.svg";
import profile2user  from "../../../assets/images/icons/profile2user.svg";
import arrowright2  from "../../../assets/images/icons/arrowright2.svg";
import axios from "axios";
import { Link } from "react-router-dom";

function ApplicantProject({application}) {

    const appstatuses = ["", "grey", "grey", "green", "red"];

    if (application.user_seen === 0) {
        axios.post(serverURL + "application/seen/"+application.id).then((response => console.log(response.data)));
    }

    return (
        <div className="project">
                <div className="img" style={{backgroundImage: "url("+
                serverURL + "uploads/"+application.project.main_photo.path+")"}}></div>
                <div className="info">
                    <h3>{application.project.name}</h3>
                    <p className="author"><a href="#"><img src={user} alt="" /> <span>{application.project.author.surname + " " + application.project.author.name} </span></a></p>
                    <p className="querytxt">
                        <span className="color-black">Вы: </span>
                        {application.message}
                    </p>
                    <div className="status">
                        <span className={appstatuses[application.appstatus.idj]}>Заявка {application.appstatus.name.toLowerCase()}</span>
                        <div className="btns d-flex justify-content-end align-items-center">
                            <Link to={"/project/"+application.project.id}><img className="more" src={arrowright2} alt="" /></Link>
                        </div>
                    </div>
                </div>
                <div className="category">
                    <img src={serverURL+"uploads/"+application.project.theme[application.project.theme.length - 1].path} alt="" />
                </div>
            </div>
    );
}

export default ApplicantProject