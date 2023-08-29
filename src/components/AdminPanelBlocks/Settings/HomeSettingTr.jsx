import check from '../../../assets/images/icons/check.svg'
import serverURL from '../../../serveraddress'
import edit from '../../../assets/images/icons/edit.svg';
import { useState } from 'react';
import OpenedSetting from './OpenedSetting';
import FlyAlert from '../../FlyAlert';
import axios from 'axios';

function HomeSettingTr({setting, index, added}) {

    let date = new Date(setting.created_date);
    date = (date.getDate() < 10 ? "0"+date.getDate() : date.getDate()) + "."+(date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth()) + "." +date.getFullYear();


    const [isOpen, setIsOpen] = useState(false);

    const [alert, setAlert] = useState(false);

    const setActive = () => {
        if (!setting.isActive) {
            axios.post(serverURL+"systeminfo/setActive/"+setting.id)
            .then(res => {
                console.log(res.data);
                added();
            });
        }
    }

    return (
    <>
        <tr>
            <td className="isActive" onClick={setActive} > {setting.isActive ? <img src={check} alt="" /> : ""} </td>
            <td>{index+1}</td>
            <td className="photo"> <img src={serverURL+"uploads/"+setting.header_image} alt="" /> </td>
            <td>{setting.name}</td>
            <td>{setting.slogan}</td>
            <td>{setting.header_description}</td>
            <td>{date}</td>
            <td onClick={() => setIsOpen(true)} className="tdedit">
                <img className="toedit" src={edit} alt="" />
            </td>
        </tr>
        {
            isOpen===true && <OpenedSetting setting={setting} closeBlock={setIsOpen} setAlert={setAlert}/>
        }
        {
            alert && <FlyAlert text={alert} setSended={setAlert}/>
        }
    </>
    )
}

export default HomeSettingTr