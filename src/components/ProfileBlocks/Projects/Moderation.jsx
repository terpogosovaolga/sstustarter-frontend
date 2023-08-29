import axios from "axios";
import { useEffect, useState } from "react";
import serverURL from "../../../serveraddress";
import { Link } from "react-router-dom";

export default function Moderation({close, moderation}) {

    if (moderation) {
        return (
        <div className="background" style={{zIndex: 50}}>
            <div className="window" onClick={close}>
                <p className="color-blue">{moderation.moderator.surname + " " + moderation.moderator.name + ", " + "Модератор СГТУ Стартер"}</p>
                <p style={{backgroundColor: "var(--light)", padding: "1rem", margin: 0}}>{moderation.message}</p>
                <p>Ваш проект {moderation.status.name}</p>
                {
                    moderation.status.id == 4 &&
                    <div className="for_btn d-flex justify-content-end">
                        <Link className="ready" to={'/createproject?edit=true&id='+moderation.project_id}>К редактированию проекта</Link>
                        <div className="cancel ml-2rem" onClick={close}>Отмена</div>
                    </div>
                }
            </div>
        </div>);
    }
    else {
        return "";
    }
    
}