import serverURL from "../../../serveraddress";
import edit from '../../../assets/images/icons/edit.svg';

export default function ThemeTr({theme, index}) {
    
    
    const getParentString = () => {
        let str = "";
        if (theme.parents)
        {
            for (let i = theme.parents.length - 1; i >= 0; i--) {
                str += theme.parents[i].name + " / ";
            }
        }
        str += theme.name;
        return str;
    }

    return (
        <tr>
            <td>{index+1}</td>
            <td className="icon"> <img src={serverURL+"uploads/"+theme.path} alt="" /> </td>
            <td>{theme.name}</td>
            <td>{getParentString()}</td>
            <td className="tdedit">
                <img className="toedit" src={edit} alt="" />
            </td>
        </tr>
    );
}