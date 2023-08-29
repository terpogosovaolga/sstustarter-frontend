import { useState } from 'react';
import settings from '../../../assets/images/icons/settings.svg';
import { Link, useNavigate } from 'react-router-dom';
import OpenedProject from './OpenedProject';
import FlyAlert from '../../FlyAlert';

export default function ProjectTr({project, index}) {

    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState(false);
    // console.log(project);
    const str = project.author.surname + " " + project.author.name + (project.author.patronymic ? " " + project.author.patronymic + ", " : ", ") + project.author.job + " " + (project.author.structure[0].abbreviation ? project.author.structure[0].abbreviation : project.author.structure[0].decoding);

    let date = new Date(project.created_date);
    date = (date.getDate() < 10 ? "0"+date.getDate() : date.getDate()) + "."+(date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth()) + "." +date.getFullYear();

    const navigate = useNavigate();

    return (
        <>
        <tr>
            <td onClick={() => navigate("/project/"+project.id)} className="role-marker">{index+1}</td>
            <td onClick={() => setIsOpen(true)}>{project.moderations_count+1}</td>
            <td><Link to={"/profile/"+project.author_id}>{str}</Link></td>
            <td onClick={() => navigate("/project/"+project.id)}>{project.name}</td>
            <td onClick={() => navigate("/project/"+project.id)}>{project.theme.slice(0).reverse().map((t, i) => t.name +   ( i == project.theme.length - 1 ? "" : " / "))}</td>
            <td onClick={() => navigate("/project/"+project.id)}>{date}</td>
            <td className="tdedit" onClick={() => setIsOpen(true)}> <img src={settings} alt="" /> </td>
        </tr>
        {
            isOpen && <OpenedProject project={project} close={() => setIsOpen(false)} setMessage={setMessage}/>
        }
        {
            message && <FlyAlert text={message} setSended={setMessage}/>
        }
        </>
    )
};