
import user  from "../../../assets/images/icons/user.svg";
import profile2user  from "../../../assets/images/icons/profile2user.svg";
import arrowright2  from "../../../assets/images/icons/arrowright2.svg";
import book1  from "../../../assets/images/icons/book1.svg";
import serverURL from "../../../serveraddress";
import { Link } from "react-router-dom";
function MemberProject({project}) {
    return (
        <div className="project">
            <div className="img" style={{backgroundImage: "url("+serverURL+"uploads/"+project.main_photo.path+")"}}></div>
            <div className="info">
                <h3>{project.name}</h3>
                <p className="author"><a href="#"><img src={user} alt="" /> <span>{project.author.surname + " " + project.author.name}</span></a></p>
                <div className="btns d-flex justify-content-end align-items-center">
                    <Link to={"/project/"+project.id}><img className="more" src={arrowright2} alt="" /></Link>
                </div>
            </div>
            <div className="category">
                <img src={book1} alt="" />
            </div>
        </div>
    );
}

export default MemberProject;