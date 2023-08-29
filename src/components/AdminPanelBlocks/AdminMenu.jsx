function AdminMenu({sec, setSec}) {
    return (
        <nav className="profile_menu main d-flex flex-row justify-content-start align-items-center">
            <a className={sec == "settings" ? "active " : ""} onClick={() => {setSec("settings")}}>Настройки сайта</a>
            <a className={sec == "users" ? "ml-2rem active " : "ml-2rem"} onClick={() => {setSec("users")}}>Пользователи</a>
            <a className={sec == "statistics" ? "ml-2rem active " : "ml-2rem"} onClick={() => {setSec("statistics")}}>Статистика</a>
        </nav>
    );
}

export default AdminMenu;