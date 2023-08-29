import MemberProject from "./MemberProject";
import { useEffect , useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import serverURL from "../../../serveraddress";
function MemberProjectsBlock() {

    const userId = useSelector(state => state.auth.userId);
    const isAuth = useSelector(state => state.auth.isAuth);

    const [projects, setProjects] = useState([]);

    useEffect(()=> {
        if (isAuth) {
            axios.get(serverURL+"projects/member/"+userId)
                .then(response => {
                    if (response.data.success) {
                        setProjects(response.data.projects);
                        console.log(response.data);
                    }
            });
        }
        
    }, []);

    return (
        <div className="projects small part justify-content-between">
            {projects.length > 0 && 
                projects.map((pr) => <MemberProject key={pr.id} project={pr} />)   
            }
            {projects.length == 0 && <h1>Вы не являетесь участником ни одного проекта</h1>}
            
        </div>
    );
}

export default MemberProjectsBlock;