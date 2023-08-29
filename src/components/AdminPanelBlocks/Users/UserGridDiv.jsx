import serverURL from "../../../serveraddress";
import edit from '../../../assets/images/icons/edit.svg';
import settings from '../../../assets/images/icons/settings.svg';
import { useNavigate } from "react-router-dom";
export default function UserGridDiv({user, index, roleFunc}) {

    const navigate = useNavigate();

    return (
        <div class="person">
            <div class="img" style={{backgroundImage: "url("+serverURL+"uploads/"+user.avatar_path+")"}} >
                <span class="role-marker" onClick={roleFunc}>
                {
                    user.role_id == 2 && "А" 
                }
                {
                    user.role_id == 3 && "М"
                }
                {
                    user.role_id == 1 && 
                    <img src={settings} alt="" />
                }
                </span>
            </div>
            <h5  onClick={() => navigate("/profile/"+user.id)}>{user.surname} <br />{user.name} <br/>{user.patronymic ? user.patronymic : ""} </h5>
            <p  onClick={() => navigate("/profile/"+user.id)}>{user.job}</p>
            <p  onClick={() => navigate("/profile/"+user.id)}>{(user.structure[0].abbreviation ? user.structure[0].abbreviation : user.structure[0].decoding) + (user.structure.length > 1 ? " (" + (user.structure[user.structure.length-1].abbreviation ? user.structure[user.structure.length-1].abbreviation : user.structure[user.structure.length-1].decoding) + ")" : "")}</p>
        </div>
    );
}