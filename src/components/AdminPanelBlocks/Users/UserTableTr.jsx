import settings from '../../../assets/images/icons/settings.svg';
import edit from '../../../assets/images/icons/edit.svg';
import { useNavigate } from 'react-router-dom';
function UserTableTr({user, index, roleFunc}) {

    const navigate = useNavigate();
    
    return (
        <tr>
            <td className="role-marker" onClick={roleFunc}>
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
            </td>
            <td onClick={() => navigate("/profile/" + user.id)}>{index+1}</td>
            <td onClick={() => navigate("/profile/" + user.id)}>{user.surname + " " + user.name + " " + (user.patronymic ? user.patronymic : "")}</td>
            <td onClick={() => navigate("/profile/" + user.id)}>{(user.structure[0].abbreviation ? user.structure[0].abbreviation : user.structure[0].decoding) + (user.structure.length > 1 ? " (" + (user.structure[user.structure.length-1].abbreviation ? user.structure[user.structure.length-1].abbreviation : user.structure[user.structure.length-1].decoding) + ")" : "")}</td>
            <td onClick={() => navigate("/profile/" + user.id)}>{user.job}</td>
        </tr>
    );
}

export default UserTableTr;