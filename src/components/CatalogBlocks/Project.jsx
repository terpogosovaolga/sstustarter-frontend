import user from '../../assets/images/icons/user.svg';
import arrow from '../../assets/images/icons/arrowright2.svg';
import book from '../../assets/images/icons/book1.svg';
import serverURL from '../../serveraddress';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

function Project({project}) {
    const navigate = useNavigate();
    return (
        <div className="project">
            <div className="img" style={{backgroundImage: "url("+serverURL + "uploads/" + project.main_photo.path+")"}}></div>
            <div className="info">
                <h3>{project.name}</h3>
                <p className="author" onClick={() => navigate("/profile/"+project.author.id)}>
                    <a>
                        <img src={user} alt="" /> <span>{project.author.surname + " " + project.author.name} </span>
                    </a>
                </p>
                <Link to={"/project/"+project.id}><img className="more" src={arrow} alt="" /></Link>
            </div>
            <div className="category">
                <img src={serverURL + "uploads/" + project.theme[project.theme.length - 1].path} alt="" />
            </div>
        </div>
    );
}

export default Project;