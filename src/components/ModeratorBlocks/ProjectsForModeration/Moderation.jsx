import { useSelector } from "react-redux";

export default function Moderation({moderation}) {

    let date = new Date(moderation.created_date);
    date = (date.getDate() < 10 ? "0"+date.getDate() : date.getDate()) + "."+(date.getMonth() < 10 ? "0"+date.getMonth() : date.getMonth()) + "." +date.getFullYear();

    const userId = useSelector(state => state.auth.userId);

    let who = (userId == moderation.moderator_id ? "Вы" : (moderation.moderator.surname + " " + moderation.moderator.name ));

    return (
        <div className="moder">
            <p>{date}: <strong>{moderation.status.name}</strong></p>
            <p><span className="who">{who}:</span> {moderation.message}</p>
        </div>
    )
}