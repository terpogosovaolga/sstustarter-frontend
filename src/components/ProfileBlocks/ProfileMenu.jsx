import axios from "axios";
import serverURL from "../../serveraddress";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function ProfileMenu({sec, setSec, isNew, setIsNew}) {

    const [isNewApplications, setIsNewApplications] = useState(false);

    const userId = useSelector(state => state.auth.userId);
    const role = useSelector(state => state.auth.role);
    console.log("role "+ role);

    useEffect(() => {
        if (role === 1) {
            axios.get(serverURL + "applications/author/isNew/"+userId)
            .then(response => {
                console.log(response.data);
                if (response.data.success === true) {
                    if (response.data.count > 0) {
                        setIsNewApplications(true)
                    }
                }
                else {
                    console.log(response.data);
                }
            });
        }
    }, []);

    return (
        <section>
        <nav className="profile_menu main d-flex flex-row justify-content-start align-items-center">
            <a  className={"profile " + (sec == "user" ? "active" : "")} onClick={() => setSec("user")}>Профиль</a>
            {role == 1 && 
               <><a  onClick={() => setSec("projects")} className={"projects ml-2rem " + (sec == "projects" ? "active " : "") + (isNew ? "new" : "")}>Проекты</a>
                <a  onClick={() => setSec("queries")} className={"queries ml-2rem " + (sec == "queries" ? "active " : "") + (isNewApplications ? " new" : "")}>Заявки</a></>
            }
            {
                role == 2 && 
                <Link className="projects ml-2rem" to="/admin"> Административная панель </Link>
            }
            {
                role == 3 &&
                <Link className="projects ml-2rem" to="/moderator">Кабинет модератора</Link>
            }
        </nav>
    </section>
    );
}

export default ProfileMenu;