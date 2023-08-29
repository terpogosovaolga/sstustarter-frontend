import check from '../../../assets/images/icons/check.svg';
import serverURL from '../../../serveraddress';
import edit from '../../../assets/images/icons/edit.svg';
import axios from 'axios';
import { useState } from 'react';
import OpenedNet from './OpenedNet';
function NetTr({net, index, setUpdate}) {

    let date = new Date(net.created_date);
    date = (date.getDate() < 10 ? "0"+date.getDate() : date.getDate()) + "."+(date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth()) + "." +date.getFullYear();

    const setActive = () => {
        const num = net.archive ? 0 : 1;
        axios.post(serverURL+"netsicons/archive/"+net.id+"/"+num)
        .then(res => {
            console.log(res.data);
            setUpdate();
        })
    }

    const [isOpen, setIsOpen] = useState(false);
    const [alert, setAlert] = useState(false);

    return (
        <>
        <tr>
            <td className="isActive" onClick={setActive}> {!net.archive ? <img src={check} alt="" /> : ""} </td>
            <td>{index+1}</td>
            <td className="photo"> <img src={serverURL+"uploads/"+net.path} alt="" /> </td>
            <td>{net.net}</td>
            <td><a href={net.link}>{net.link}</a></td>
            <td>{date}</td>
            <td className="tdedit" onClick={() => setIsOpen(true)}>
                <img className="toedit" src={edit} alt="" />
            </td>
        </tr>
        {
            isOpen===true && <OpenedNet net={net} closeBlock={setIsOpen} setAlert={setAlert}/>
        }
        </>
    );
}

export default NetTr;