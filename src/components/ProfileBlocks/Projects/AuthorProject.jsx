import serverURL from "../../../serveraddress";
import check  from "../../../assets/images/icons/check.svg";
import closesquare  from "../../../assets/images/icons/closesquare.svg";
import arrowright2  from "../../../assets/images/icons/arrowright2.svg";
import edit from '../../../assets/images/icons/edit.svg';
import { Link } from "react-router-dom";
import { useState } from "react";
import Moderation from "./Moderation";
import { useEffect } from "react";
import axios from "axios";

function AuthorProject({project}) {
    
    const [seeModeration, setSeeModeration] = useState(false);
    const [moderation, setModeration] = useState({});

    const trySetSeeModeration = () => {
        if (project.status.name != "Отправлен на модерацию") {
            setSeeModeration(true);
        }
    }

    useEffect(() => {
        console.log('useeff');
        axios.get(serverURL+"moderation/last/"+project.id)
        .then(res => {
            if (res.data.success) {
                setModeration(res.data.moderation);
            }
        });
        if (project.user_seen == 0) {
            setUserSeen();
        }
    }, []);

    const setUserSeen = () => {
        console.log('user seen');
        axios.get(serverURL + "project/seen/"+project.id)
        .then(res => console.log(res.data));
    }


    return (<>
    <div className="project">
        <div className="img" style={{backgroundImage: "url("+serverURL+"uploads/"+project.main_photo.path+")"}}></div>
        <div className="info">
            <h3>{project.name}</h3>
            {project.status_id === 3 && <p className="author"><a href="#">{project.membersCount} участников</a></p>}
            {project.status_id != 3 && <p className="author" onClick={trySetSeeModeration}>{project.status.name}</p>}
            <div className="btns d-flex justify-content-end align-items-center">
                <Link to={"/createproject?edit=true&id="+project.id}> <img src={edit} alt="" /> </Link>
                <Link to={"/project/"+project.id}><img className="more" src={arrowright2} alt="" /></Link>
            </div>
        </div>
        {project.newApplications > 0 && <div className="queries d-flex align-items-center">
            новые заявки
        </div>}
        {project.user_seen == 0 && <div className="queries d-flex align-items-center">
            ответ от модератора
        </div>}
        <div className="category">
            <img src={serverURL+"uploads/"+project.theme[project.theme.length - 1].path} alt="" />
        </div>

    </div>
    
    {
        seeModeration && <Moderation close={() => setSeeModeration(false)} moderation={moderation} />
    }
    </>);
}
export default AuthorProject