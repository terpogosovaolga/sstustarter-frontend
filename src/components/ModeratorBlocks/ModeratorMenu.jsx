import { useState } from "react";

export default function ModeratorMenu({sec, setSec}) {


    return (
        <nav className="profile_menu small d-flex flex-row justify-content-start align-items-center">
            <a className={sec == 0 ? "active" : ""} onClick={() => setSec(0)} id="org">Проекты, требующие проверок</a>
            <a  className={sec == 1 ? "active ml-2rem" : " ml-2rem"} id="part" onClick={() => setSec(1)}>Истории проверок</a>
            {/* <a  className={sec == 2 ? "active ml-2rem" : " ml-2rem"} onClick={() => setSec(2)}>Статистика</a> */}
        </nav>
    );
}