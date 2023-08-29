import { Link } from "react-router-dom";

export default function ModerationTr({moderation, index}) {

    const author = moderation.project.author;
    const name = author.surname + " " + author.name + " " + (author.patronymic ? author.patronymic : "");

    let date = new Date(moderation.created_date);
    date = (date.getDate() < 10 ? "0"+date.getDate() : date.getDate()) + ":" + (date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth()) + ":" + date.getFullYear();

    return (
        <tr>
            <td>{index+1}</td>
            <td>{moderation.status.name}</td>
            <td><Link to={"/project/"+moderation.project.id}>{moderation.project.name}</Link></td>
            <td><Link to={"/profile/"+author.id}>{name}</Link></td>
            <td>{moderation.message}</td>
            <td className="tdedit"> {date} </td>
        </tr>
    );
}