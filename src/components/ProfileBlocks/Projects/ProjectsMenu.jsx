export default function ProjectsMenu({sec, changeSec, isNewA}) {
    console.log("promenu " + isNewA);
    return (
        <nav className="profile_menu small d-flex flex-row justify-content-start align-items-center">
            <a className={sec == "org" ? "active" : ""} onClick={() => changeSec("org")} >Я - организатор</a>
            <a className={sec == "part" ? "ml-2rem active" : "ml-2rem"} onClick={() => changeSec("part")}>Я - участник</a>
            <a className={(sec == "wish" ? "ml-2rem active" : "ml-2rem ") + (isNewA ? " new " : "")} onClick={() => changeSec("wish")}>Я - желающий</a>
        </nav>
    );
}